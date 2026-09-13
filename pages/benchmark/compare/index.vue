<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DefaultView } from '~/feature/benchmarkcompare';
import { features } from '~/composables/useFeatureFlag';
</script>

<template>
  <FeatureGuard :feature="features.BENCHMARK_COMPARER">
    <DefaultView />
  </FeatureGuard>
</template>
