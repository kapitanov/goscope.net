<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  disabled: { type: Boolean, default: true },
  title: { type: String, default: '' },
  href: { type: String, default: '' },
  nuxtLink: { type: Boolean, default: true },
  size: { type: String, default: '' },
  busy: { type: Boolean, default: true },
  class: { type: String, default: '' }
});

const isLarge = computed(() => props.size === 'xl');

const layout = {
  flex: true,
  'justify-center': true,
  'items-center': true,
  'px-2': true,
  'py-1': true,
  rounded: true,
  'border-2': true
};
const clickable = {
  'border-cyan-700': true,
  'text-white': true,
  'bg-cyan-700': true,
  'hover:bg-cyan-600': true,
  'hover:border-cyan-600': true,
  'active:bg-cyan-800': true,
  'active:border-cyan-800': true
};
const disabledNonClickable = {
  'border-gray-400': true,
  'text-gray-700': true,
  'bg-gray-400': true,
  'cursor-not-allowed': true
};
const busyNonClickable = {
  'border-cyan-800': true,
  'text-white': true,
  'bg-cyan-800': true
};
const contentClass = {
  flex: true,
  'items-center': true,
  'gap-1': true,
  'mx-2': isLarge,
  'mx-1': !isLarge,
  'my-1': isLarge
};

function combine(...classes) {
  let result = {};

  for (const c of classes) {
    if (typeof c === 'string') {
      result = { ...result, [c]: true };
    } else {
      result = { ...result, ...c };
    }
  }

  return result;
}

const isHref = computed(() => !!props.href);
const isDisabled = computed(() => !!props.disabled);
const isBusy = computed(() => !props.disabled && !!props.busy);
</script>

<template>
  <a
    v-if="isHref && !nuxtLink && !isDisabled"
    :href="href"
    :class="combine(clickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </a>
  <NuxtLink
    v-if="isHref && nuxtLink && !isDisabled"
    :href="href"
    :class="combine(clickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </NuxtLink>
  <button
    v-if="!isHref && !isDisabled"
    :class="combine(clickable, layout, props.class)"
    :title="title"
    @click="emit('click')"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </button>
  <span
    v-if="isDisabled"
    :class="combine(disabledNonClickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </span>
  <span
    v-if="isBusy"
    :class="combine(busyNonClickable, layout, props.class)"
    :title="title"
  >
    <span style="display: block; position: relative">
      <span :class="contentClass" style="visibility: collapse">
        <slot />
      </span>
      <span class="absolute top-0 bottom-0 left-0 right-0">
        <Spinner />
      </span>
    </span>
  </span>
</template>