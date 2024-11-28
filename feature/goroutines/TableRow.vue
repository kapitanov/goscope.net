<script setup lang="ts">
import { ICONS } from '~/const';

interface TableControl {
  onExpand(handler: () => void): void;
  onCollapse(handler: () => void): void;
}

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
  const isRunnable = props.item && (props.item.state === 'runnable' || props.item.state === 'running');
  return {
    'text-balance': true,
    'text-green-900': isRunnable,
    'text-red-900': !isRunnable
  };
});
</script>

<template>
  <div class="flex flex-col gap-1 px-2 py-1 font-mono border-b border-gray-200">
    <div class="flex flex-row gap-2">
      <div class="w-6 shrink-0">
        <a href="" class="block hover:text-cyan-700" @click.prevent="toggleHandler">
          <Icon v-if="!expanded" :name="ICONS.EXPAND_ROW" />
          <Icon v-if="expanded" :name="ICONS.COLLAPSE_ROW" />
        </a>
      </div>
      <div class="w-16 shrink-0">
        <span :class="contextualTextClass">{{ item.id }}</span>
      </div>
      <div class="hidden md:block w-48 shrink-0 overflow-hidden text-ellipsis" :title="item.state">
        <span :class="contextualTextClass">{{ item.state }}</span>
      </div>
      <div class="block md:hidden grow shrink-0 overflow-hidden text-ellipsis" :title="item.state">
        <span :class="contextualTextClass">{{ item.state }}</span>
      </div>
      <div class="hidden md:block grow">
        <CopyableText>
          <a
            href=""
            class="grow-1 hover:text-cyan-700 hover:underline decoration-cyan-700 text-balance text-green-900 break-all"
            @click.prevent="toggleHandler"
          >
            <span :class="contextualTextClass">
              {{ item.stack[0].function }}
            </span>
          </a>
        </CopyableText>
      </div>
    </div>

    <div class="flex md:hidden flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="grow">
        <CopyableText>
          <a href="" class="grow-1 hover:text-cyan-700 hover:underline decoration-cyan-700 text-balance break-all" @click.prevent="toggleHandler">
            <span :class="contextualTextClass">
              {{ item.stack[0].function }}
            </span>
          </a>
        </CopyableText>
      </div>
    </div>

    <div v-if="expanded" class="flex flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="w-16 shrink-0 hidden lg:block"></div>
      <div class="w-48 shrink-0 hidden lg:block"></div>
      <div class="grow">
        <ul class="border-s-2 border-cyan-900">
          <li v-for="frame in item.stack" :key="frame.id" class="flex flex-col ms-2">
            <span class="text-cyan-900 text-balance break-all">
              {{ frame.function }}
            </span>
            <span class="ms-4 text-balance break-all"> {{ frame.file }}:{{ frame.line }} {{ frame.offset }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
