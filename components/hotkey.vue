<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <slot />
</template>

<script setup lang="ts">
const isMacOS = /(Mac|iPhone|iPod|iPad)/i.test((navigator && navigator.platform) || '');
const props = defineProps({
  hotkey: { type: String, default: '' }
});
const emits = defineEmits(['pressed']);

const hotkey = computed(() => {
  let key = (props.hotkey as string).toLowerCase();
  let ctrl = false;
  if (key.startsWith('ctrl+')) {
    ctrl = true;
    key = key.slice('ctrl+'.length);
  }
  return { key, ctrl };
});

const keyDownHandler = (e: KeyboardEvent) => {
  if (!hotkey.value.ctrl) {
    const focused = document.activeElement as HTMLElement;
    if (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA') {
      return;
    }
  }

  const expected = hotkey.value.key.toLowerCase();
  if (e.key.toLowerCase() !== expected && e.code.toLowerCase() !== expected) {
    return;
  }

  if (hotkey.value.ctrl) {
    if (isMacOS && !e.metaKey) {
      return;
    }
    if (!isMacOS && !e.ctrlKey) {
      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();
  emits('pressed');
};

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler);
});
onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler);
});
</script>
