<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
  href: { type: String, default: '' },
  text: { type: String, default: '' },
  target: { type: String, default: '' }
});

const clickable = {
  'text-cyan-700': true,
  'dark:text-cyan-400': true,
  underline: true,
  'decoration-cyan-700': true,
  'hover:text-cyan-600': true,
  'dark:hover:text-cyan-300': true,
  'hover:decoration-cyan-600': true
};
</script>
<template>
  <a :class="clickable" :href="href" :target="target">
    {{ text || href }}
  </a>
</template>
