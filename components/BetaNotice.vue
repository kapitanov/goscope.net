<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <span v-if="config.public.environment === 'STAGING'">
    <slot></slot>
  </span>
</template>
