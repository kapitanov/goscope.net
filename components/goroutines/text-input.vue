<script setup lang="ts">
import { ICONS } from '../../const';

import { example, parse } from '~/pprof/goroutines';

const emit = defineEmits(['data']);

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

  <TextField v-model="text" type="textarea" class="w-full" placeholder="Paste your stack trace here" :disabled="disabled"
    :autofocus="true" />

  <div class="flex flex-col md:flex-row gap-1 mt-2">
    <div class="flex gap-1">
      <Button :disabled="disabled" class="w-full md:w-auto" @click="goHandler">
        <Icon :name="ICONS.GO" />
        <span>Go!</span>
        <HotkeyHint hotkey="Ctrl+Enter" />
      </Button>
      <Button :disabled="disabled" class="w-full md:w-auto" @click="useExampleHandler">
        <Icon :name="ICONS.USE_EXAMPLE" />
        <span>Use an example input</span>
      </Button>
    </div>
    <div class="hidden md:block grow"></div>
    <div class="flex gap-1">
      <Button :disabled="disabled" class="w-full md:w-auto" @click="pasteHandler">
        <Icon :name="ICONS.PASTE" />
        <span>Paste from clipboard</span>
        <HotkeyHint hotkey="Ctrl+V" />
      </Button>
      <Button :disabled="disabled" class="w-full md:w-auto" @click="clearHandler">
        <Icon :name="ICONS.CLEAR" />
        <span>Clear</span>
      </Button>
    </div>
  </div>

  <div class="mt-2">
    <ErrorPresenter :error="error" />
  </div>
</template>
