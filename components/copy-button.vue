<script setup lang="ts">
import { ICONS } from '../const';
const props = defineProps(['text']);

const layout = {
    'flex': true,
    'justify-center': true,
    'items-center': true,
    'px-2': true,
    'py-1': true,
    'rounded': true,
    'border-2': true
};
const clickable = {
    'border-cyan-700': true,
    'text-white': true,
    'bg-cyan-700': true,
    'hover:bg-cyan-600': true,
    'hover:border-cyan-600': true,
    'active:bg-cyan-800': true,
    'active:border-cyan-800': true,
};
const success = {
    'border-green-700': true,
    'text-white': true,
    'bg-green-700': true,
};
const error = {
    'border-red-700': true,
    'text-white': true,
    'bg-red-700': true,
};

const state = ref('idle');

const clickHandler = async () => {
    try {
        await navigator.clipboard.writeText(props.text);
    } catch (e) {
        state.value = 'error';
        return;
    }

    state.value = 'copied';
    setTimeout(() => { state.value = 'idle'; }, 1500);
};
</script>

<template>
    <button :class="{ ...clickable, ...layout }" title="Copy to clipboard" @click="clickHandler" v-if="state === 'idle'">
        <Icon :name="ICONS.COPY" />
    </button>
    <button :class="{ ...success, ...layout }" disabled v-if="state === 'copied'">
        <Icon :name="ICONS.COPY_OK" />
    </button>
    <button :class="{ ...error, ...layout }" disabled v-if="state === 'error'">
        <Icon :name="ICONS.COPY_ERROR" />
    </button>
</template>