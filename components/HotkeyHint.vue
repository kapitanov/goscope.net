<script setup lang="ts">
const props = defineProps({
  hotkey: { type: String, default: '' },
  color: { type: String, default: 'dark' }
});
const isMacOS = /(Mac|iPhone|iPod|iPad)/i.test((navigator && navigator.platform) || '');
const commandButton = isMacOS ? '\u2318' : 'Ctrl';

const hotkey = computed(() => {
  let key = props.hotkey as string;
  let ctrl = false;
  if (key.toLowerCase().startsWith('ctrl+')) {
    ctrl = true;
    key = key.slice('ctrl+'.length);
  }
  return { key, ctrl };
});

const classes = computed(() => {
  return {
    flex: true,
    'items-center': true,
    'ms-2': true,
    'opacity-50': true,
    border: true,
    'border-1': true,
    rounded: true,
    'px-1': true,
    'text-xs': true,
    'text-gray-500': props.color === 'light',
    'border-gray-500': props.color === 'light',
    'text-white': props.color === 'dark',
    'border-white': props.color === 'dark',
    'h-[18px]': true,
    'min-w-[18px]': true,
    'text-center': true,
    'font-mono': true
  };
});
</script>

<template>
  <ClientOnly>
    <span :class="classes">
      <span v-if="hotkey.ctrl">{{ commandButton }}+</span>
      <span>{{ hotkey.key }}</span>
    </span>
  </ClientOnly>
</template>
