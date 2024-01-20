<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
const config = useRuntimeConfig();
</script>

<template>
    <div v-if="config.public.environment === 'STAGING'">
        <slot></slot>
    </div>
</template>