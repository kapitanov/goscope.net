<script setup lang="ts">
defineProps({
  href: { type: String, default: '' },
  nuxtLink: { type: Boolean, default: false },
  target: { type: String, default: '' }
});
const anchorClass = {
  'w-12': true,
  'h-12': true,
  'rounded-full': true,
  'flex': true,
  'items-center': true,
  'place-items-center': true,
  'text-cyan-800': true,
  'hover:bg-cyan-600': true,
  'hover:text-white': true,
  'active:bg-cyan-800': true,
  'active:text-white': true
};
const spanClass = {
  'text-3xl': true,
  'sm:text-2xl': true,
  'font-semibold': true,
  'leading-6': true,
  'flex-1': true,
  'text-center': true
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
