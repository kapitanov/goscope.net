<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: null },
  value: { type: String, default: null }
});
</script>

<template>
  <div class="flex flex-row border border-cyan-700 rounded">
    <div class="text-white bg-cyan-700 py-0 px-2">{{ props.name }}</div>
    <div class="text-cyan-700 bg-white py-0 px-2 rounded-tr rounded-br">{{ props.value }}</div>
  </div>
</template>
