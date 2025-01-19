<script setup lang="ts">
import { fetch } from './impl';
import { APP_URL, ICONS } from '~/const';

const emit = defineEmits(['data']);

const disabled = ref<boolean>(false);
const error = ref<any | null>(null);
const clearErrorHandler = () => {
  error.value = null;
};

const url = defineModel<string>({ default: '' });
const validationError = ref<string | null>();
const urlHint = ref<string | null>(null);

const validate = (): boolean => {
  validationError.value = null;
  const value = url.value;

  if (value === '') {
    validationError.value = 'Enter an URL';
    return false;
  }

  let u;
  try {
    u = new URL(value);
  } catch {
    validationError.value = 'This is not a valid URL';
    return false;
  }

  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    validationError.value = 'Only HTTP(S) URLs are supported';
    return false;
  }

  if (u.searchParams.get('debug') !== '2') {
    urlHint.value = `Don't forget to add "?debug=2" to your URL`;
  } else {
    urlHint.value = null;
  }

  return true;
};

watch(url, () => validate());

const goHandler = async () => {
  if (disabled.value) {
    return;
  }

  if (!validate()) {
    return;
  }

  disabled.value = true;
  error.value = null;

  try {
    const data = await fetch(url.value);
    emit('data', data);
  } catch (err: any) {
    error.value = err;
    disabled.value = false;
  }
};

const pasteHandler = async () => {
  if (disabled.value) {
    return;
  }

  try {
    const value = await navigator.clipboard.readText();
    error.value = null;
    url.value = value;
  } catch (err) {
    error.value = err;
  }
};

const useExampleHandler = () => {
  if (disabled.value) {
    return;
  }

  url.value = window && window.location ? `${window.location.origin}/debug/pprof/goroutine?debug=2` : `${APP_URL}/debug/pprof/goroutine?debug=2`;
  useTrackEvent('select_content', {
    content_type: 'example',
    content_id: 'goroutines_url'
  });
};

const clearHandler = () => {
  if (disabled.value) {
    return;
  }

  error.value = null;
  url.value = '';
};
</script>

<template>
  <Hotkey hotkey="Ctrl+Enter" @pressed="goHandler" />
  <Hotkey hotkey="Ctrl+V" @pressed="pasteHandler" />

  <form class="flex flex-col gap-2" @submit.prevent="goHandler">
    <div>Paste an URL of your PPROF goroutines endpoint into a text field below and click "Go!" to visualize it.</div>
    <div>It works event with localhost URLs (assuming you have correct CORS policy on your service's side)!</div>

    <div class="flex gap-2">
      <TextField v-model="url" type="url" class="w-full" placeholder="Paste your URL here" :disabled="disabled" :autofocus="true" />
    </div>

    <div class="flex flex-col md:flex-row gap-1">
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

    <ul class="grow text-gray-500 text-sm">
      <li>We will fetch this URL locally, so it must be accessible from your computer. No data will be sent to our servers.</li>
      <li v-if="!validationError && urlHint" class="text-yellow-700">Don't forget to add <code>?debug=2</code> to your URL.</li>
      <li v-if="validationError" class="text-red-700">
        {{ validationError }}
      </li>
    </ul>
    <div class="mt-2">
      <ErrorPresenter :error="error" :dismissable="true" @dismiss="clearErrorHandler" />
    </div>
  </form>
</template>
