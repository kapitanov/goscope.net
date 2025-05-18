<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import StateFilter from './StateFilter.vue';
import Table from './Table.vue';
import Chart from './Chart.vue';
import { GoroutineProfile, filter } from './impl';
import { APP_URL, ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null }
});
const emit = defineEmits(['reset']);

const permalink = computed(() => {
  const data = props.data as GoroutineProfile;
  if (!data.url) {
    return null;
  }

  return window && window.location
    ? `${window.location.origin}/goroutines?url=${encodeURIComponent(data.url)}`
    : `${APP_URL}/goroutines?url=${encodeURIComponent(data.url)}`;
});
const isWebShareSupported = navigator?.share !== undefined;

class TableControl {
  private expandHandlers: (() => void)[] = [];
  private collapseHandlers: (() => void)[] = [];

  constructor() {
    this.expandHandlers = [];
    this.collapseHandlers = [];
  }

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
const stateFilter = ref([]);
const displayData = ref<GoroutineProfile | null>(null);

const refreshDisplayData = () => {
  if (!props.data) {
    displayData.value = null;
    return;
  }

  displayData.value = filter(props.data as GoroutineProfile, {
    text: textFilter.value,
    states: stateFilter.value
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
watch(stateFilter, () => refreshDisplayData());
refreshDisplayData();

const hasFilter = computed(() => textFilter.value.length > 0 || stateFilter.value.length > 0);
const clearFilter = () => {
  textFilter.value = '';
  stateFilter.value = [];
};

const onSelectCategoryFromChart = (category: string) => {
  stateFilter.value = [category];
};
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-1 mt-4 mb-2">
    <div class="flex flex-row gap-1 mb-1 justify-items-stretch lg:justify-items-start">
      <Button align="center" class="grow lg:grow-0" @click="emit('reset')">
        <Icon :name="ICONS.RESET" />
        <span class="hidden md:inline">Try another stack trace</span>
      </Button>
      <Button title="Expand all table rows" class="grow lg:grow-0" @click="() => tableControl.expand()">
        <Icon :name="ICONS.EXPAND" />
      </Button>
      <Button title="Collapse all table rows" class="grow lg:grow-0" @click="() => tableControl.collapse()">
        <Icon :name="ICONS.COLLAPSE" />
      </Button>

      <CopyButton v-if="permalink" :text="permalink" title="Copy permalink to clipboard" class="inline-block grow lg:hidden">
        <Icon :name="ICONS.LINK" />
      </CopyButton>
      <ShareButton v-if="permalink && isWebShareSupported" :url="permalink" title="Share permalink" class="inline-block grow lg:hidden" />
    </div>

    <div class="flex sm:flex-row flex-col gap-1 mb-1">
      <StateFilter v-model="stateFilter" class="w-full sm:w-1/2 lg:w-[220px]" :data="data" />
      <TextField
        ref="textFilterField"
        v-model="textFilter"
        class="w-full sm:w-1/2 lg:w-[220px]"
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

    <div class="hidden lg:flex flex-row gap-1 mb-1">
      <CopyButton v-if="permalink" :text="permalink" title="Copy permalink to clipboard">
        <Icon :name="ICONS.LINK" />
      </CopyButton>
      <ShareButton v-if="permalink && isWebShareSupported" :url="permalink" title="Share permalink" />
    </div>
  </div>

  <Chart v-if="displayData && (!stateFilter || stateFilter.length === 0)" :data="displayData" @select="onSelectCategoryFromChart" />

  <Table v-if="displayData" :data="displayData" />
</template>
