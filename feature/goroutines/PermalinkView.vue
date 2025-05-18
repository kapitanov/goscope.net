<script setup lang="ts">
import Header from './Header.vue';
import Viewer from './Viewer.vue';
import { GoroutineProfile, fetch } from './impl';

const router = useRouter();
const props = defineProps({
  url: { type: String, default: '' }
});
const busy = ref<boolean>(true);
const error = ref<any | null>(null);
const data = ref<GoroutineProfile | null>(null);

onMounted(async () => {
  busy.value = true;
  error.value = null;

  try {
    data.value = await fetch(props.url);
  } catch (err: any) {
    error.value = err;
  } finally {
    busy.value = false;
  }
});

const onReset = () => {
  router.push('/goroutines');
};
</script>
<template>
  <div>
    <Header v-if="data">
      Displaying data from <span class="font-mono">{{ props.url }}</span>
    </Header>

    <Viewer v-if="data" :data="data" @reset="onReset" />

    <ErrorPresenter :error="error" />

    <div v-if="busy" class="flex items-center justify-center">
      <Spinner />
    </div>
  </div>
</template>
