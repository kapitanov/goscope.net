<script setup lang="ts">
const props = defineProps({
  active: { type: String, default: '' },
  class: { type: String, default: '' }
});
const emit = defineEmits(['select']);

const active = ref(props.active);
provide('activeTab', active);
watch(
  () => props.active,
  (value) => {
    active.value = value;
  }
);

provide('selectTab', (tab: string) => {
  emit('select', tab);
});

const ulClass = {
  flex: true,
  'gap-2': true,
  border: true,
  'border-cyan-800': true,
  rounded: true
};
</script>
<template>
  <ul :class="combineClasses(ulClass, props.class)">
    <slot></slot>
  </ul>
</template>
