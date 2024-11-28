<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const nodeEnv = process?.env.NODE_ENV ?? '';
const config = useRuntimeConfig();
const props = defineProps({
    name: { type: String, default: '' },
});
</script>

<template>
    <span v-if="props.name && (config.public.environment === props.name || nodeEnv === props.name)">
        <slot></slot>
    </span>
</template>
