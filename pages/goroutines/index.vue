<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { DefaultView, PermalinkView } from '~/feature/goroutines';

const route = useRoute();
const permalinkUrl = computed(() => route.query.url as string | undefined);
const isPermalink = computed(() => permalinkUrl.value !== undefined);
const isDefault = computed(() => !isPermalink.value);
</script>

<template>
  <FeatureGuard :feature="features.GOROUTINES">
    <DefaultView v-if="isDefault" />
    <PermalinkView v-if="isPermalink" :url="permalinkUrl" />
  </FeatureGuard>
</template>
