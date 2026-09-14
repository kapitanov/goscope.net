<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: null },
  value: { type: String, default: null }
});
</script>

<template>
  <div class="flex flex-row border border-gray-500 dark:border-gray-600 rounded">
    <div class="text-white bg-gray-500 dark:bg-gray-600 py-0 px-2">{{ props.name }}</div>
    <div class="text-gray-500 dark:text-gray-300 bg-white dark:bg-surface py-0 px-2 rounded-tr rounded-br">{{ props.value }}</div>
  </div>
</template>
