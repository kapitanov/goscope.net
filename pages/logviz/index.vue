<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DefaultView } from '~/feature/logviz';
import { features } from '~/composables/useFeatureFlag';
</script>

<template>
  <FeatureGuard :feature="features.LOG_VISUALIZER">
    <DefaultView />
  </FeatureGuard>
</template>
