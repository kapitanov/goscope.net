<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DemoView } from '~/feature/goroutines';
</script>

<template>
  <FeatureGuard :feature="features.GOROUTINES">
    <DemoView />
  </FeatureGuard>
</template>
