<script setup lang="ts">
defineProps({
  href: { type: String, default: '' },
  nuxtLink: { type: Boolean, default: false },
  target: { type: String, default: '' }
});
const anchorClass = {
  flex: true,
  'items-center': true,
  'place-items-center': true,
  'text-cyan-800': true,
  'no-underline': true,
  'hover:text-cyan-600': true,
  'hover:underline': true,
  'hover:decoration-cyan-600': true,
  'active:text-cyan-900': true,
  'active:underline': true,
  'active:decoration-cyan-900': true
};
const spanClass = {
  'text-sm': true,
  'flex-1': true,
  flex: true,
  'gap-1': true,
  'items-center': true,
  'place-items-center': true
};
</script>

<template>
  <a v-if="!nuxtLink" :href="href" :class="anchorClass" :target="target">
    <span :class="spanClass">
      <slot />
    </span>
  </a>
  <NuxtLink
    v-if="!!nuxtLink"
    :href="href"
    :class="anchorClass"
    :target="target"
  >
    <span :class="spanClass">
      <slot />
    </span>
  </NuxtLink>
</template>
