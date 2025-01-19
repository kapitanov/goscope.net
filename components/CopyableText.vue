<script setup lang="ts">
import { ICONS } from '../const';

const state = ref('idle');

const buttonClass = computed(() => {
  return {
    'inline-block': true,
    'me-2': true,
    'self-baseline':true,
    'text-gray-900': state.value === 'idle',
    'hover:text-cyan-700': state.value === 'idle',
    'active:text-cyan-900': state.value === 'idle',
    'text-green-900': state.value === 'ok',
    'text-red-900': state.value === 'error'
  };
});

const slots = useSlots();

const getSlotChildrenText = (children: any[]) =>
  children
    .map((node: any) => {
      if (!node.children || typeof node.children === 'string') {
        return node.children || '';
      }

      if (Array.isArray(node.children)) {
        return getSlotChildrenText(node.children);
      }

      if (node.children.default) {
        return getSlotChildrenText(node.children.default());
      }

      return '';
    })
    .join('');

const text = computed(() => {
  const slotContent = slots.default && getSlotChildrenText(slots.default());
  return `${slotContent}`;
});

const clickHandler = async () => {
  try {
    state.value = 'idle';
    await navigator.clipboard.writeText(text.value);
    state.value = 'ok';
  } catch (err: any) {
    /* eslint-disable-next-line no-console */
    console.error('Failed to copy:', err.message || err);
    state.value = 'error';
  } finally {
    setTimeout(() => {
      state.value = 'idle';
    }, 2000);
  }
};
</script>
<template>
  <span class="flex">
    <button :class="buttonClass" type="button" :disabled="state !== 'idle'" @click.prevent="clickHandler">
      <Icon v-if="state === 'idle'" :name="ICONS.COPY" />
      <Icon v-if="state === 'ok'" :name="ICONS.COPY_OK" />
      <Icon v-if="state === 'error'" :name="ICONS.COPY_ERROR" />
    </button>

    <slot></slot>
  </span>
</template>
