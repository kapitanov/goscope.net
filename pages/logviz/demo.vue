<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DemoView } from '~/feature/logviz';
</script>

<template>
  <FeatureGuard :feature="features.LOG_VISUALIZER">
    <DemoView />
  </FeatureGuard>
</template>
