<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const route = useRoute();
const permalinkUrl = computed(() => route.query.url as string | undefined);
const isPermalink = computed(() => permalinkUrl.value !== undefined);
const isDefault = computed(() => !isPermalink.value);
</script>
<template>
  <div>
    <GoroutinesDefaultView v-if="isDefault" />
    <GoroutinesPermalinkView v-if="isPermalink" :url="permalinkUrl" />
  </div>
</template>
