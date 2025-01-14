<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { environment } from '../config';
const props = defineProps({
    name: { type: String, default: '' },
});
</script>

<template>
    <span v-if="!props.name || environment === props.name">
        <slot></slot>
    </span>
</template>
