<script setup lang="ts">
const emit = defineEmits(['data']);
</script>

<template>
    <div class="mt-4">
        <strong>Goroutines viewer</strong> is a tool to view all goroutines in your application at once.
        It takes a snapshot of all goroutines (taken from PPROF) and displays them in a table form, allowing you to filter
        it and view goroutines state at glance.
    </div>

    <div class="mt-4">
        <GoroutinesAbout />
    </div>

    <GoroutinesTextInput @data="(data) => emit('data', data)" />
</template>