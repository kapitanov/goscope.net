<script setup lang="ts">
const classes = {
    'font-mono':true,
    'text-cyan-700': true,
};

</script>

<template>
    <span :class="classes">
        <slot></slot>
    </span>
</template>
