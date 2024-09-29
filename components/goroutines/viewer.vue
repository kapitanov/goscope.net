<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { GoroutineProfile, filter } from '~/pprof/goroutines';
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
const displayData = ref<GoroutineProfile | null>(null);

const refreshDisplayData = () => {
  if (!props.data) {
    displayData.value = null;
    return;
  }

  displayData.value = filter(props.data as GoroutineProfile, {
    text: textFilter.value
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
refreshDisplayData();
</script>

<template>
  <div class="flex gap-1 mt-4 mb-2">
    <Button size="sm" @click="emit('reset')">
      <Icon :name="ICONS.RESET" />
      <span class="hidden md:inline">Try another stack trace</span>
    </Button>
    <Button size="sm" title="Expand all table rows" @click="() => tableControl.expand()">
      <Icon :name="ICONS.EXPAND" />
    </Button>
    <Button size="sm" title="Collapse all table rows" @click="() => tableControl.collapse()">
      <Icon :name="ICONS.COLLAPSE" />
    </Button>

    <TextField ref="textFilterField" v-model="textFilter" class="w-64" placeholder="Filter by text..." hotkey="ctrl+K" :clearable="true" />

    <div class="grow"></div>
    <CopyButton v-if="permalink" :text="permalink" title="Copy permalink to clipboard" size="sm">
      <Icon :name="ICONS.LINK" />
    </CopyButton>
    <ShareButton v-if="permalink && isWebShareSupported" :url="permalink" title="Share permalink" size="sm" />
  </div>

  <GoroutinesTable v-if="displayData" :data="displayData" />
</template>
