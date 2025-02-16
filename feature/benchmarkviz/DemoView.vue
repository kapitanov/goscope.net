<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Viewer from './Viewer.vue';
import { example, parse } from './impl';

const router = useRouter();
const data = parse(example);
const onReset = () => {
  router.push('/benchmark');
};
</script>

<template>
  <div>
    <Viewer :data="data" :is-demo="true" @reset="onReset" />
  </div>
</template>
