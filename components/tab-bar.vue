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
</script>
<template>
  <ul :class="'flex gap-2 ' + props.class">
    <slot></slot>
  </ul>
</template>
