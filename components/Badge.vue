<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: null },
  value: { type: String, default: null }
});
</script>

<template>
  <div class="flex flex-row border border-gray-500 rounded">
    <div class="text-white bg-gray-500 py-0 px-2">{{ props.name }}</div>
    <div class="text-gray-500 bg-white py-0 px-2 rounded-tr rounded-br">{{ props.value }}</div>
  </div>
</template>
