<script setup lang="ts">
import { ICONS } from '../../const';

const props = defineProps(['data']);
const emit = defineEmits(['reset']);
</script>

<template>
    <form class="flex gap-2 mt-4 mb-2">
        <Button @click="emit('reset')" :icon="ICONS.RESET" text="Try another stack trace" />
        <button type="submit" style="display: none;"></button>
    </form>

    <GoroutinesTable :data="data" />
</template>