<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Viewer from './Viewer.vue';
import { exampleOld, exampleNew, parse, compare } from './impl';

const router = useRouter();
const data = compare(parse(exampleOld), parse(exampleNew));
const onReset = () => {
  router.push('/benchmark/compare');

  useTrackEvent('reset_benchmark', { from: 'demo_view', content_type: 'benchmark_compare' });
};
</script>

<template>
  <div>
    <Viewer :data="data" :is-demo="true" @reset="onReset" />
  </div>
</template>
