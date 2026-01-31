<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Header from './Header.vue';
import Viewer from './Viewer.vue';
import { example, parse } from './impl';

const router = useRouter();
const data = parse(example);
const onReset = () => {
  router.push('/goroutines');
};
</script>

<template>
  <div>
    <Header :goback-visible="true" goback-label="Try another stack trace" @goback="onReset()">
      Displaying demo data
    </Header>

    <Viewer :data="data" />
  </div>
</template>
