<script setup lang="ts">
defineProps({
  ctrl: { type: Boolean, default: false }
});
const isMacOS = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
const commandButton = isMacOS ? '\u2318' : 'Ctrl';
</script>

<template>
  <span class="flex items-center text-gray-500 mx-4">
    <span v-if="ctrl">{{ commandButton }}+</span>
    <span>
      <slot />
    </span>
  </span>
</template>
