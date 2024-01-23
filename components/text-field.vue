<script setup lang="ts">
const model = defineModel<string>({
    default: '',
});

defineProps({
    value: { type: String, default: '' },
    type: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
});

const baseClass = {
    'font-mono': true,
    'rounded': true,
    'outline': true,
    'outline-1': true,
    'bg-white': true,
    'outline-gray-500': true,
    'hover:outline-cyan-700': true,
    'focus:outline-cyan-700': true,
    'disabled:outline-gray-500': true,
    'disabled:text-gray-500': true,
    'disabled:bg-gray-200': true,
};

const textareaClass = {
    ... baseClass,
    'px-2': true,
    'py-2': true,
    'w-full': true,
    'h-64': true,
};

const inputClass = {
    ... baseClass,
    'px-2': true,
    'py-2': true,
    'w-full': true,
};
</script>

<template>
    <textarea v-if="type === 'textarea'" v-model="model" :class="textareaClass" :placeholder="placeholder" :disabled="disabled" />
    <input v-else :type="type" v-model="model" :class="inputClass" :placeholder="placeholder" :disabled="disabled" />
</template>