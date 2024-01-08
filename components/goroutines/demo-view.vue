<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { example, parse } from '~/pprof/goroutines';
const router = useRouter();

const data = parse(example);

const onReset = () => {
  router.push('/goroutines');
};
</script>

<template>
  <div>
    <GoroutinesHeader> Displaying demo data </GoroutinesHeader>

    <GoroutinesViewer :data="data" @reset="onReset" />
  </div>
</template>
