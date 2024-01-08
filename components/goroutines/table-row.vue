<script setup lang="ts">
import { ICONS } from '~/const';

interface TableControl {
  onExpand(handler: () => void): void;
  onCollapse(handler: () => void): void;
}

defineProps({
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
</script>
<template>
  <div class="flex flex-col gap-1 px-2 py-1 font-mono border-b boder-gray-200">
    <div class="flex flex-row gap-2">
      <div class="w-6 shrink-0">
        <a
          href=""
          class="block hover:text-cyan-700"
          @click.prevent="toggleHandler"
        >
          <Icon v-if="!expanded" :name="ICONS.EXPAND_ROW" />
          <Icon v-if="expanded" :name="ICONS.COLLAPSE_ROW" />
        </a>
      </div>
      <div class="w-16 shrink-0">
        {{ item.id }}
      </div>
      <div
        class="hidden md:block w-48 shrink-0 overflow-hidden text-ellipsis"
        :title="item.state"
      >
        {{ item.state }}
      </div>
      <div
        class="block md:hidden grow shrink-0 overflow-hidden text-ellipsis"
        :title="item.state"
      >
        {{ item.state }}
      </div>
      <div class="hidden md:block grow">
        <a
          href=""
          class="block hover:text-cyan-700 hover:underline decoration-cyan-700 text-balance break-all"
          @click.prevent="toggleHandler"
        >
          {{ item.stack[0].function }}
        </a>
      </div>
    </div>

    <div class="flex md:hidden flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="grow">
        <a
          href=""
          class="block hover:text-cyan-700 hover:underline decoration-cyan-700 text-balance break-all"
          @click.prevent="toggleHandler"
        >
          {{ item.stack[0].function }}
        </a>
      </div>
    </div>

    <div v-if="expanded" class="flex flex-row gap-2">
      <div class="w-6 shrink-0"></div>
      <div class="w-16 shrink-0 hidden lg:block"></div>
      <div class="w-48 shrink-0 hidden lg:block"></div>
      <div class="grow">
        <ul class="border-s-2 border-cyan-900">
          <li
            v-for="frame in item.stack"
            :key="frame.id"
            class="flex flex-col ms-2"
          >
            <span class="text-cyan-900 text-balance break-all">
              {{ frame.function }}
            </span>
            <span class="ms-4 text-balance break-all">
              {{ frame.file }}:{{ frame.line }} {{ frame.offset }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
