<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Header from './Header.vue';
import Viewer from './Viewer.vue';
import { example, parse } from '~/pprof/goroutines';

const router = useRouter();
const data = parse(example);
const onReset = () => {
  router.push('/goroutines');
};
</script>

<template>
  <div>
    <Header> Displaying demo data </Header>

    <Viewer :data="data" @reset="onReset" />
  </div>
</template>
