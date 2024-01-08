<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { combineClasses } from '~/utils/classes';

const emit = defineEmits(['click']);
const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  title: { type: String, default: '' },
  href: { type: String, default: '' },
  nuxtLink: { type: Boolean, default: false },
  size: { type: String, default: '' },
  busy: { type: Boolean, default: false },
  class: { type: String, default: '' },
  color: { type: String, default: '' }
});

const colorSchemes = {
  default: {
    clickable: {
      'border-cyan-700': true,
      'text-white': true,
      'bg-cyan-700': true,
      'hover:bg-cyan-600': true,
      'hover:border-cyan-600': true,
      'active:bg-cyan-800': true,
      'active:border-cyan-800': true
    },
    disabledNonClickable: {
      'border-gray-400': true,
      'text-gray-500': true,
      'bg-gray-400': true,
      'cursor-not-allowed': true
    },
    busyNonClickable: {
      'border-cyan-800': true,
      'text-white': true,
      'bg-cyan-800': true
    }
  },
  danger: {
    clickable: {
      'border-red-700': true,
      'text-white': true,
      'bg-red-700': true,
      'hover:bg-red-600': true,
      'hover:border-red-600': true,
      'active:bg-red-800': true,
      'active:border-red-800': true
    },
    disabledNonClickable: {
      'border-gray-400': true,
      'text-gray-700': true,
      'bg-gray-400': true,
      'cursor-not-allowed': true
    },
    busyNonClickable: {
      'border-red-800': true,
      'text-white': true,
      'bg-red-800': true
    }
  }
};

const colors = computed(
  () => colorSchemes[props.color] || colorSchemes.default
);

const layout = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        flex: true,
        'justify-center': true,
        'items-center': true,
        'px-1': true,
        'py-1': true,
        rounded: true,
        'border-2': true
      };
    default:
      return {
        flex: true,
        'justify-center': true,
        'items-center': true,
        'px-2': true,
        'py-1': true,
        rounded: true,
        'border-2': true
      };
  }
});

const clickable = computed(
  () => colors.value.clickable || colorSchemes.default.clickable
);
const disabledNonClickable = computed(
  () =>
    colors.value.disabledNonClickable ||
    colorSchemes.default.disabledNonClickable
);
const busyNonClickable = computed(
  () => colors.value.busyNonClickable || colorSchemes.default.busyNonClickable
);

const contentClass = computed(() => {
  switch (props.size) {
    case 'xl':
      return {
        flex: true,
        'items-center': true,
        'gap-1': true,
        'mx-2': true,
        'my-1': true
      };
    case 'sm':
      return {
        flex: true,
        'items-center': true,
        'gap-1': true,
        'mx-1': true
      };
    default:
      return {
        flex: true,
        'items-center': true,
        'gap-1': true,
        'mx-1': true,
        'my-1': true
      };
  }
});

const isHref = computed(() => !!props.href);
const isDisabled = computed(() => !!props.disabled);
const isBusy = computed(() => !props.disabled && !!props.busy);
</script>

<template>
  <a
    v-if="isHref && !nuxtLink && !isDisabled && !isBusy"
    :href="href"
    :class="combineClasses(clickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </a>
  <NuxtLink
    v-if="isHref && nuxtLink && !isDisabled && !isBusy"
    :href="href"
    :class="combineClasses(clickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </NuxtLink>
  <button
    v-if="!isHref && !isDisabled && !isBusy"
    :class="combineClasses(clickable, layout, props.class)"
    :title="title"
    :type="props.type"
    @click="emit('click')"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </button>
  <span
    v-if="isDisabled && !isBusy"
    :class="combineClasses(disabledNonClickable, layout, props.class)"
    :title="title"
  >
    <span :class="contentClass">
      <slot />
    </span>
  </span>
  <span
    v-if="isBusy"
    :class="combineClasses(busyNonClickable, layout, props.class)"
    :title="title"
  >
    <span style="display: block; position: relative">
      <span :class="contentClass" style="visibility: hidden">
        <slot />
      </span>
      <span class="absolute top-0 bottom-0 left-0 right-0 flex justify-center">
        <Spinner />
      </span>
    </span>
  </span>
</template>
