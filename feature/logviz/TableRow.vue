<script setup lang="ts">
import { ICONS } from '~/const';

interface TableControl {
  onExpand(handler: () => void): void;
  onCollapse(handler: () => void): void;
}

const ERROR_LEVELS = ['ERROR', 'FATAL', 'PANIC', 'CRITICAL', 'ALERT', 'EMERGENCY'];
const WARNING_LEVELS = ['WARN'];

const props = defineProps({
  item: { type: Object, default: null }
});
const expanded = ref(false);
const tableControl = inject<TableControl>('TableControl');
if (tableControl) {
  tableControl.onExpand(() => {
    expanded.value = true;
  });
  tableControl.onCollapse(() => {
    expanded.value = false;
  });
}

const toggleHandler = () => {
  expanded.value = !expanded.value;
};

const contextualTextClass = computed(() => {
  const level = props.item?.level;
  return {
    'text-balance': true,
    'text-red-900 dark:text-red-400': ERROR_LEVELS.includes(level),
    'text-yellow-700 dark:text-yellow-400': WARNING_LEVELS.includes(level)
  };
});
</script>

<template>
  <div class="flex flex-col gap-1 px-2 py-1 font-mono border-b border-gray-200 dark:border-gray-700">
    <div class="flex flex-row gap-2">
      <div class="w-6 shrink-0">
        <button
          type="button"
          class="block hover:text-cyan-700 dark:hover:text-cyan-400"
          :aria-expanded="expanded"
          aria-label="Toggle log entry details"
          @click="toggleHandler"
        >
          <Icon v-if="!expanded" :name="ICONS.EXPAND_ROW" />
          <Icon v-if="expanded" :name="ICONS.COLLAPSE_ROW" />
        </button>
      </div>
      <div class="hidden md:block w-44 shrink-0 overflow-hidden text-ellipsis" :title="item.timestamp">
        <span :class="contextualTextClass">{{ item.timestamp || '—' }}</span>
      </div>
      <div class="w-20 shrink-0 overflow-hidden text-ellipsis" :title="item.level">
        <span :class="contextualTextClass">{{ item.level }}</span>
      </div>
      <div class="hidden lg:block w-32 shrink-0 overflow-hidden text-ellipsis" :title="item.logger">
        <span :class="contextualTextClass">{{ item.logger }}</span>
      </div>
      <div class="hidden md:block grow">
        <CopyableText>
          <a href="" class="grow-1 hover:text-cyan-700 dark:hover:text-cyan-400 hover:underline decoration-cyan-700 text-balance break-all" @click.prevent="toggleHandler">
            <span :class="contextualTextClass">
              {{ item.message || item.raw }}
            </span>
          </a>
        </CopyableText>
      </div>
    </div>

    <div class="flex md:hidden flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="grow">
        <CopyableText>
          <a href="" class="grow-1 hover:text-cyan-700 dark:hover:text-cyan-400 hover:underline decoration-cyan-700 text-balance break-all" @click.prevent="toggleHandler">
            <span :class="contextualTextClass">
              {{ item.message || item.raw }}
            </span>
          </a>
        </CopyableText>
      </div>
    </div>

    <div v-if="expanded" class="flex flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="grow">
        <CopyButton size="xs" :text="item.raw">Copy raw log line</CopyButton>
        <ul class="border-s-2 border-cyan-900 dark:border-cyan-600 mt-2">
          <li v-if="item.timestamp" class="flex flex-col ms-2">
            <span class="text-cyan-900 dark:text-cyan-400 text-balance break-all">timestamp</span>
            <span class="ms-4 text-balance break-all">{{ item.timestamp }}</span>
          </li>
          <li v-if="item.logger" class="flex flex-col ms-2">
            <span class="text-cyan-900 dark:text-cyan-400 text-balance break-all">logger</span>
            <span class="ms-4 text-balance break-all">{{ item.logger }}</span>
          </li>
          <li v-for="field in item.fields" :key="field.key" class="flex flex-col ms-2">
            <span class="text-cyan-900 dark:text-cyan-400 text-balance break-all">{{ field.key }}</span>
            <span class="ms-4 text-balance break-all whitespace-pre-wrap">{{ field.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
