<script setup lang="ts">
defineProps({
  header: { type: String, default: '' }
});
</script>
<template>
  <div class="mb-2">
    <h2 v-if="header" class="text-xl font-bold">{{ header }}</h2>
    <div>
      <slot />
    </div>
  </div>
</template>
