<script setup lang="ts">
import { combineClasses } from '~/utils/classes';
import { ICONS } from '~/const';

const model = defineModel<string>({
  default: ''
});

const props = defineProps({
  class: { type: String, default: '' },
  value: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  hotkey: { type: String, default: '' },
  altHotkey: { type: String, default: '' },
  autofocus: { type: Boolean, default: false }
});

const lineCount = computed(() => {
  console.log('model value:', model.value);
  return (model.value ?? '').split('\n').length;
});

const borderClass = {
  flex: true,
  relative: true,
  rounded: true,
  border: true,
  'border-1': true,
  'bg-white': true,
  'border-gray-500': true,
  'hover:border-cyan-700': true,
  'focus:border-cyan-700': true,
  'disabled:border-gray-500': true,
  'disabled:text-gray-500': true,
  'disabled:bg-gray-200': true,
  'h-64': true,
  'p-2': true,
  'overflow-y-scroll': true
};
const baseClass = {
  'font-mono': true,
  'bg-white': true,
  'disabled:text-gray-500': true,
  'disabled:bg-gray-200': true
};
const numbersClass = {
  ...baseClass,
  'text-gray-400': true,
  'pr-2': true,
  'border-r': true,
  'border-gray-500': true,
  'hover:border-cyan-700': true,
  'focus:border-cyan-700': true,
  'disabled:border-gray-500': true,
  '-my-2': true,
  'py-2': true,
  'text-right': true,
  'select-none': true,
  'user-select-none': true
};
const textareaClass = {
  ...baseClass,
  'outline-none': true,
  'p-0': true,
  'pl-2': true,
  'overflow-clip': true
};
</script>

<template>
  <div :class="combineClasses(borderClass, props.class)">
    <div class="flex relative rounded w-full h-min min-h-full">
      <div :class="numbersClass">
        <div v-for="num in lineCount">{{ num }}</div>
      </div>
      <textarea ref="textarea" v-model="model" :class="combineClasses(textareaClass, props.class)" :disabled="disabled"></textarea>
    </div>
  </div>
</template>
