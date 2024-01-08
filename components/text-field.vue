<script setup lang="ts">
import { combineClasses } from '~/utils/classes';
import { ICONS } from '~/const';

const model = defineModel<string>({
  default: ''
});

const props = defineProps({
  class: { type: String, default: '' },
  value: { type: String, default: '' },
  type: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  hotkey: { type: String, default: '' },
  autofocus: { type: Boolean, default: false }
});

const borderClass = {
  flex: true,
  relative: true,
  rounded: true,
  outline: true,
  'outline-1': true,
  'bg-white': true,
  'outline-gray-500': true,
  'hover:outline-cyan-700': true,
  'focus:outline-cyan-700': true,
  'disabled:outline-gray-500': true,
  'disabled:text-gray-500': true,
  'disabled:bg-gray-200': true
};

const baseClass = {
  'font-mono': true,
  rounded: true,
  'bg-white': true,
  'disabled:text-gray-500': true,
  'disabled:bg-gray-200': true
};

const textareaClass = {
  ...baseClass,
  'px-2': true,
  'py-2': true,
  'h-64': true
};

const inputClass = {
  ...baseClass,
  'px-2': true,
  'py-2': true
};

const textarea = ref<null | HTMLTextAreaElement>(null);
const input = ref<null | HTMLInputElement>(null);
const onHotkey = () => {
  textarea.value?.focus();
  input.value?.focus();
};

onMounted(() => {
  if (props.autofocus) {
    textarea.value?.focus();
    input.value?.focus();
  }
});
</script>

<template>
  <Hotkey :hotkey="props.hotkey" @pressed="onHotkey">
    <div :class="combineClasses(borderClass, props.class)">
      <div
        v-if="!model && type === 'textarea'"
        class="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-top px-2 py-2 text-gray-500"
      >
        <span class="grow">{{ placeholder }}</span>
        <HotkeyHint :hotkey="props.hotkey" />
      </div>

      <div
        v-if="!model && type !== 'textarea'"
        class="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center px-2 py-2 text-gray-500"
      >
        <span class="grow">{{ placeholder }}</span>
        <HotkeyHint :hotkey="props.hotkey" />
      </div>

      <div
        v-if="clearable && model"
        class="absolute top-0 right-0 bottom-0 w-auto flex"
      >
        <Button :disabled="disabled" title="Clear" @click="() => (model = '')">
          <Icon :name="ICONS.X" />
        </Button>
      </div>

      <textarea
        v-if="type === 'textarea'"
        ref="textarea"
        v-model="model"
        :class="combineClasses(textareaClass, props.class)"
        :disabled="disabled"
      />
      <input
        v-else
        ref="input"
        v-model="model"
        :type="type"
        :class="combineClasses(inputClass, props.class)"
        :disabled="disabled"
      />
    </div>
  </Hotkey>
</template>
