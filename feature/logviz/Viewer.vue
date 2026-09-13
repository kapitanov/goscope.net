<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import LevelFilter from './LevelFilter.vue';
import FieldFilter from './FieldFilter.vue';
import Table from './Table.vue';
import { LogEntries, FieldFilterArgs, filter } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  isDemo: { type: Boolean, default: false }
});
const emit = defineEmits(['reset']);

class TableControl {
  private expandHandlers: (() => void)[] = [];
  private collapseHandlers: (() => void)[] = [];

  expand() {
    this.expandHandlers.forEach((handler) => handler());
  }

  collapse() {
    this.collapseHandlers.forEach((handler) => handler());
  }

  onExpand(handler: () => void): void {
    this.expandHandlers.push(handler);
  }

  onCollapse(handler: () => void): void {
    this.collapseHandlers.push(handler);
  }
}
const tableControl = new TableControl();
provide('TableControl', tableControl);

const textFilter = ref('');
const levelFilter = ref<string[]>([]);
const fieldFilter = ref<FieldFilterArgs | null>(null);
const displayData = ref<LogEntries | null>(null);

const refreshDisplayData = () => {
  if (!props.data) {
    displayData.value = null;
    return;
  }

  displayData.value = filter(props.data as LogEntries, {
    text: textFilter.value,
    levels: levelFilter.value,
    field: fieldFilter.value
  });
};
watch(
  () => props.data,
  () => {
    textFilter.value = '';
    refreshDisplayData();
  }
);
watch(textFilter, () => refreshDisplayData());
watch(levelFilter, () => refreshDisplayData());
watch(fieldFilter, () => refreshDisplayData());
refreshDisplayData();

const hasFilter = computed(() => textFilter.value.length > 0 || levelFilter.value.length > 0 || !!fieldFilter.value);
const clearFilter = () => {
  textFilter.value = '';
  levelFilter.value = [];
  fieldFilter.value = null;
};

const formatLabel = computed(() => {
  switch ((props.data as LogEntries)?.format) {
    case 'json-payload':
      return 'text with a JSON payload';
    case 'logfmt':
      return 'logfmt';
    case 'json-lines':
      return 'JSON Lines';
    default:
      return null;
  }
});
</script>

<template>
  <div class="flex gap-2 lg:items-end lg:flex-row flex-col mb-4">
    <Button align="center" class="grow lg:grow-0" @click="emit('reset')">
      <Icon :name="ICONS.RESET" />
      <span class="hidden md:inline">Try another log</span>
    </Button>
    <h1 class="md:text-2xl text-xl font-semibold">
      <span>Log visualizer</span>
      <span v-if="props.isDemo" class="text-gray-500 text-balance break-all text-base font-normal ms-2">Displaying demo data</span>
    </h1>
    <div class="grow"></div>
  </div>

  <div v-if="formatLabel" class="text-gray-500 text-sm mb-2">
    Detected input format: <span class="font-mono">{{ formatLabel }}</span>
  </div>

  <div class="flex flex-col lg:flex-row gap-1 mt-2 mb-2">
    <div class="flex flex-row gap-1 mb-1 justify-items-stretch lg:justify-items-start">
      <Button title="Expand all table rows" class="grow lg:grow-0" @click="() => tableControl.expand()">
        <Icon :name="ICONS.EXPAND" />
        <span class="hidden md:inline">Expand all</span>
      </Button>
      <Button title="Collapse all table rows" class="grow lg:grow-0" @click="() => tableControl.collapse()">
        <Icon :name="ICONS.COLLAPSE" />
        <span class="hidden md:inline">Collapse all</span>
      </Button>
    </div>

    <div class="flex sm:flex-row flex-col gap-1 mb-1">
      <LevelFilter v-model="levelFilter" class="w-full sm:w-1/3 lg:w-[200px]" :data="data" />
      <FieldFilter v-model="fieldFilter" class="w-full sm:w-1/3 lg:w-[200px]" :data="data" />
      <TextField
        ref="textFilterField"
        v-model="textFilter"
        class="w-full sm:w-1/3 lg:w-[220px]"
        placeholder="Filter by text..."
        hotkey="/"
        alt-hotkey="ctrl+KeyK"
      />
      <Hotkey hotkey="KeyX" @pressed="clearFilter" />
      <Button v-if="hasFilter" @click="clearFilter">
        <Icon :name="ICONS.X" />
        <span class="hidden lg:inline">Clear filter</span>
        <HotkeyHint hotkey="X" />
      </Button>
    </div>

    <div class="grow"></div>
  </div>

  <Table v-if="displayData" :data="displayData" />
</template>
