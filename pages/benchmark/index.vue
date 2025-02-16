<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DefaultView } from '~/feature/benchmarkviz';
import { features } from '~/composables/useFeatureFlag';
</script>

<template>
    <FeatureGuard :feature="features.BENCHMARK_VISUALIZER">
        <DefaultView />
    </FeatureGuard>
</template>

