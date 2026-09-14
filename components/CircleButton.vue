<script setup lang="ts">
const props = defineProps({
  href: { type: String, default: '' },
  nuxtLink: { type: Boolean, default: false },
  target: { type: String, default: '' },
  title: { type: String, default: '' }
});
const emit = defineEmits(['click']);
const isButton = computed(() => !props.href);

const anchorClass = {
  'w-12': true,
  'h-12': true,
  'rounded-full': true,
  flex: true,
  'items-center': true,
  'place-items-center': true,
  'text-cyan-800': true,
  'dark:text-cyan-400': true,
  'hover:bg-cyan-600': true,
  'dark:hover:bg-cyan-700': true,
  'hover:text-white': true,
  'active:bg-cyan-800': true,
  'dark:active:bg-cyan-600': true,
  'active:text-white': true
};
const spanClass = {
  flex: true,
  'items-center': true,
  'justify-center': true,
  'text-3xl': true,
  'sm:text-2xl': true,
  'font-semibold': true,
  'flex-1': true
};
</script>

<template>
  <a v-if="!isButton && !nuxtLink" :href="href" :class="anchorClass" :target="target" :title="title">
    <span :class="spanClass">
      <slot />
    </span>
  </a>
  <NuxtLink v-if="!isButton && !!nuxtLink" :href="href" :class="anchorClass" :target="target" :title="title">
    <span :class="spanClass">
      <slot />
    </span>
  </NuxtLink>
  <button v-if="isButton" type="button" :class="anchorClass" :title="title" :aria-label="title" @click="emit('click')">
    <span :class="spanClass">
      <slot />
    </span>
  </button>
</template>
