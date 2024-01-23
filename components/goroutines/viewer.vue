<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { GoroutineProfile } from '~/pprof/goroutines/parser';
import { APP_URL, ICONS } from '../../const';

const props = defineProps({
  data: { type: Object, default: null },
});
const emit = defineEmits(['reset']);

const permalink = computed(() => {
  const data = props.data as GoroutineProfile;
  if (!data.url) {
    return null;
  }

  return window && window.location ?
    `${window.location.origin}/goroutines?url=${encodeURIComponent(data.url)}`
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
    this.expandHandlers.forEach(handler => handler());
  }

  collapse() {
    this.collapseHandlers.forEach(handler => handler());
  }

  onExpand(handler: () => void): void {
    this.expandHandlers.push(handler);
  }

  onCollapse(handler: () => void): void {
    this.collapseHandlers.push(handler);
  }
};
const tableControl = new TableControl();
provide('TableControl', tableControl);
</script>

<template>
  <div class="flex gap-1 mt-4 mb-2">
    <Button @click="emit('reset')" size="sm">
      <Icon :name="ICONS.RESET" />
      <span>Try another stack trace</span>
    </Button>
    <Button @click="() => tableControl.expand()" size="sm" title="Expand all table rows">
      <Icon :name="ICONS.EXPAND" />
    </Button>
    <Button @click="() => tableControl.collapse()" size="sm" title="Collapse all table rows">
      <Icon :name="ICONS.COLLAPSE" />
    </Button>
    <div class="grow"> </div>
    <CopyButton v-if="permalink" :text="permalink" title="Copy permalink to clipboard" size="sm">
      <Icon :name="ICONS.LINK" />
    </CopyButton>
    <ShareButton v-if="permalink && isWebShareSupported" :url="permalink" title="Share permalink" size="sm" />
  </div>

  <GoroutinesTable :data="data" />
</template>
