<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DemoView } from '~/feature/benchmarkcompare';
import { features } from '~/composables/useFeatureFlag';
</script>

<template>
  <FeatureGuard :feature="features.BENCHMARK_COMPARER">
    <DemoView />
  </FeatureGuard>
</template>
