<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DemoView } from '~/feature/benchmarkviz';
</script>

<template>
  <FeatureGuard :feature="features.BENCHMARK_VISUALIZER">
    <DemoView />
  </FeatureGuard>
</template>
