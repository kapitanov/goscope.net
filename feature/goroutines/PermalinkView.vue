<script setup lang="ts">
import Header from './Header.vue';
import Viewer from './Viewer.vue';
import { GoroutineProfile, fetch } from './impl';

const router = useRouter();
const props = defineProps({
  url: { type: String, default: '' }
});
const busy = ref<boolean>(false);
const started = ref<boolean>(false);
const error = ref<any | null>(null);
const data = ref<GoroutineProfile | null>(null);

const fetchData = async () => {
  started.value = true;
  busy.value = true;
  error.value = null;

  try {
    data.value = await fetch(props.url);
  } catch (err: any) {
    error.value = err;
  } finally {
    busy.value = false;
  }
};

const onReset = () => {
  router.push('/goroutines');
};
</script>
<template>
  <div>
    <div v-if="!started" class="border-2 rounded border-yellow-300 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 p-4 flex flex-col gap-2">
      <p>This permalink asks your browser to fetch:</p>
      <p class="font-mono break-all">{{ props.url }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">Only continue if you trust this URL. The request is sent from your browser.</p>
      <div>
        <Button @click="fetchData">Fetch URL</Button>
      </div>
    </div>

    <Header v-if="data">
      Displaying data from <span class="font-mono">{{ props.url }}</span>
    </Header>

    <Viewer v-if="data" :data="data" @reset="onReset" />

    <ErrorPresenter :error="error" />

    <div v-if="started && error" class="mt-2">
      <Button @click="fetchData">Retry</Button>
    </div>

    <div v-if="busy" class="flex items-center justify-center">
      <Spinner />
    </div>
  </div>
</template>
