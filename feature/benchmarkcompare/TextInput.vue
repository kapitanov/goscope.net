<script setup lang="ts">
import { ICONS } from '../../const';
import { exampleOld, exampleNew, parse } from './impl';

const emit = defineEmits(['data']);

const error = ref<any | null>(null);
const disabled = ref<boolean>(false);
const oldText = ref<string>('');
const newText = ref<string>('');

const useExampleHandler = () => {
  oldText.value = exampleOld;
  newText.value = exampleNew;
  error.value = null;

  useTrackEvent('select_content', { content_type: 'benchmark_compare', content_id: 'example' });
};

const clearHandler = () => {
  oldText.value = '';
  newText.value = '';
  error.value = null;
};

const goHandler = () => {
  try {
    const oldOutput = parse(oldText.value);
    const newOutput = parse(newText.value);
    emit('data', { old: oldOutput, new: newOutput });
  } catch (err) {
    error.value = err;
  }
};
</script>

<template>
  <Hotkey hotkey="Ctrl+Enter" @pressed="goHandler" />

  <div class="mb-2">Paste an old and a new benchmark output (they won't be sent anywhere) and click "Compare!" to see what changed.</div>

  <div class="flex flex-col lg:flex-row gap-4">
    <div class="grow">
      <div class="mb-1 font-semibold">Old benchmark</div>
      <TextEditor v-model="oldText" class="w-full" placeholder="Paste the old benchmark output here" :disabled="disabled" :autofocus="true" />
    </div>
    <div class="grow">
      <div class="mb-1 font-semibold">New benchmark</div>
      <TextEditor v-model="newText" class="w-full" placeholder="Paste the new benchmark output here" :disabled="disabled" />
    </div>
  </div>

  <div class="flex flex-col md:flex-row gap-2 mt-2">
    <div class="flex gap-1">
      <Button :disabled="disabled" class="w-full md:w-auto" @click="goHandler">
        <Icon :name="ICONS.GO" />
        <span>Compare!</span>
        <HotkeyHint hotkey="Ctrl+Enter" />
      </Button>
      <Button :disabled="disabled" class="w-full md:w-auto" @click="useExampleHandler">
        <Icon :name="ICONS.USE_EXAMPLE" />
        <span>Use an example input</span>
      </Button>
    </div>
    <div class="hidden md:block grow"></div>
    <div class="flex gap-1">
      <Button :disabled="disabled" class="w-full md:w-auto" @click="clearHandler">
        <Icon :name="ICONS.CLEAR" />
        <span>Clear</span>
      </Button>
    </div>
  </div>

  <div class="grow text-gray-500 text-sm mt-2">We will process both benchmark outputs locally. No data will be sent to our servers.</div>

  <div class="mt-2">
    <ErrorPresenter :error="error" />
  </div>
</template>
