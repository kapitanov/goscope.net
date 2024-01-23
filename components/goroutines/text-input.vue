<script setup lang="ts">
import { ICONS } from '../../const';

import { example } from '~/pprof/goroutines/example';
import { parse } from '~/pprof/goroutines/parser';

const emit = defineEmits(['data']);

const textareaClass = {
  'font-mono': true,
  'bg-white': true,
  rounded: true,
  outline: true,
  'outline-1': true,
  'outline-gray-500': true,
  'hover:outline-cyan-700': true,
  'focus:outline-cyan-700': true,
  'px-2': true,
  'py-2': true,
  'w-full': true,
  'h-64': true
};

const error = ref<any | null>(null);
const disabled = ref<boolean>(false);
const text = defineModel<string>({ default: '' });

const setText = (value: string) => {
  text.value = value;
  error.value = null;
};

const useExampleHandler = () => {
  setText(example);

  useTrackEvent('select_content', { content_type: 'example', content_id: 'goroutines_text' });
};

const pasteHandler = async () => {
  try {
    const value = await navigator.clipboard.readText();
    setText(value);
  } catch (err) {
    error.value = err;
  }
};

const clearHandler = () => {
  setText('');
};

const goHandler = () => {
  try {
    const data = parse(text.value);
    data.text = text.value;
    emit('data', data);
  } catch (err) {
    error.value = err;
  }
};
</script>

<template>
  <Hotkey hotkey="Ctrl+Enter" @pressed="goHandler" />
  <Hotkey hotkey="Ctrl+V" @pressed="pasteHandler" />

  <div class="mb-2">
    Paste your PPROF stack trace into a text field below:
  </div>

  <TextField v-model="text" type="textarea" :class="textareaClass" placeholder="Paste your stack trace here"
    :disabled="disabled" />

  <div class="flex flex-col md:flex-row gap-1">
    <div class="flex gap-1">
      <Button :disabled="disabled" @click="goHandler" class="w-full md:w-auto">
        <Icon :name="ICONS.GO" />
        <span>Go!</span>
        <HotkeyHint :ctrl="true">Enter</HotkeyHint>
      </Button>
      <Button :disabled="disabled" @click="useExampleHandler" class="w-full md:w-auto">
        <Icon :name="ICONS.USE_EXAMPLE" />
        <span>Use an example input</span>
      </Button>
    </div>
    <div class="hidden md:block grow"></div>
    <div class="flex gap-1">
      <Button :disabled="disabled" @click="pasteHandler" class="w-full md:w-auto">
        <Icon :name="ICONS.PASTE" />
        <span>Paste from clipboard</span>
        <HotkeyHint :ctrl="true">V</HotkeyHint>
      </Button>
      <Button :disabled="disabled" @click="clearHandler" class="w-full md:w-auto">
        <Icon :name="ICONS.CLEAR" />
        <span>Clear</span>
      </Button>
    </div>
  </div>

  <div class="mt-2">
    <ErrorPresenter :error="error" />
  </div>
</template>
