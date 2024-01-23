<script setup lang="ts">
defineProps({
  ctrl: { type: Boolean, default: false }
});
const isMacOS = /(Mac|iPhone|iPod|iPad)/i.test(navigator && navigator.platform || '');
const commandButton = isMacOS ? '\u2318' : 'Ctrl';
</script>

<template>
  <ClientOnly>
    <span class="flex items-center ms-2 opacity-50">
      <span v-if="ctrl">{{ commandButton }}+</span>
      <span>
        <slot />
      </span>
    </span>
  </ClientOnly>
</template>
