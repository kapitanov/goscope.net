<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: '' }
});

const activeTab = inject<string>('activeTab');

const selectTab = inject<(tab: string) => void>('selectTab');
const onClick = () => {
  if (selectTab) {
    selectTab(props.name);
  }
};

const commonClass = {
  'h-full': true,
  'text-base': true,
  'py-1': true,
  'px-2': true,
  'first:rounded-l': true,
  'last:rounded-r': true
};
const activeClass = {
  'text-white': true,
  'bg-cyan-700': true
};
const inactiveClass = {
  'text-black': true,
  'hover:text-cyan-700': true
};
</script>
<template>
  <li class="h-full">
    <button type="button" :class="combineClasses(commonClass, activeTab === props.name ? activeClass : inactiveClass)" @click="onClick">
      <slot></slot>
    </button>
  </li>
</template>
