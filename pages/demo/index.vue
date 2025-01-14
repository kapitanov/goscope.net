<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { features } from '../../composables/useFeatureFlag';
</script>

<template>
    <FeatureGuard :feature="features.DEMO">
        <div>
            DEMO
        </div>
    </FeatureGuard>
</template>
