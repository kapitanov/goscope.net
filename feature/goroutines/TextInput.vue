<script setup lang="ts">
import { ICONS } from '../../const';

import { parse, healthyExample, concurrencyExample, blockingExample, demoExample } from './impl';

const emit = defineEmits(['data']);

const error = ref<any | null>(null);
const disabled = ref<boolean>(false);
const text = defineModel<string>({ default: '' });

const setText = (value: string) => {
  text.value = value;
  error.value = null;
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

interface Sample {
  id: string;
  value: string;
  title: string;
  description: string;
}
const samples: Sample[] = [
  {
    id: 'healthy',
    value: healthyExample,
    title: 'Healthy Application',
    description: 'Normal goroutines state with HTTP server'
  },
  {
    id: 'concurrency',
    value: concurrencyExample,
    title: 'High Concurrency',
    description: 'Many active goroutines with different states'
  },
  {
    id: 'blocking',
    value: blockingExample,
    title: 'Blocking Operations',
    description: 'Goroutines waiting on locks and channels'
  },
  {
    id: 'demo',
    value: demoExample,
    title: 'Complete Demo',
    description: 'Comprehensive example with all goroutine states'
  }
];
const useSampleHandler = (sample: Sample) => {
  setText(sample.value);

  useTrackEvent('select_goroutines_example', {
    content_type: 'goroutines_example',
    content_id: sample.id
  });
};
</script>

<template>
  <Hotkey hotkey="Ctrl+Enter" @pressed="goHandler" />

  <h4 class="text-sm font-bold text-gray-700 mb-3 flex items-center">Try with sample data:</h4>

  <div class="flex space-x-2 w-full mb-2">
    <template v-for="s in samples" :key="s.id">
      <button
        type="button"
        class="flex flex-col items-start w-1/4 p-4 border border-cyan-800 rounded cursor-pointer hover:bg-gray-50"
        @click="useSampleHandler(s)"
      >
        <div class="font-semibold text-gray-800 flex items-center">
          <Icon :name="ICONS.USE_EXAMPLE" class="mr-1" />
          <span>{{ s.title }}</span>
        </div>
        <div class="text-sm text-gray-600 mt-1">
          {{ s.description }}
        </div>
      </button>
    </template>
  </div>

  <div class="mb-2">Paste your PPROF stack trace into a text field below (it won't be sent anywhere) and click "Go!" to visualize it.</div>

  <TextEditor v-model="text" class="w-full" placeholder="Paste your stack trace here" :disabled="disabled" :autofocus="true" />

  <div class="flex flex-col md:flex-row gap-2 mt-2">
    <div class="flex gap-1">
      <Button :disabled="disabled" class="w-full md:w-auto" @click="goHandler">
        <Icon :name="ICONS.GO" />
        <span>Go!</span>
        <HotkeyHint hotkey="Ctrl+Enter" />
      </Button>
      <Button :disabled="disabled" class="w-full md:w-auto" @click="clearHandler">
        <Icon :name="ICONS.CLEAR" />
        <span>Clear</span>
      </Button>
    </div>
    <div class="hidden md:block grow"></div>
  </div>

  <div class="grow text-gray-500 text-sm mt-2">We will process this PPROF text locally. No data will be sent to our servers.</div>

  <div class="mt-2">
    <ErrorPresenter :error="error" />
  </div>
</template>
