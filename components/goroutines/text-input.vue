<script setup lang="ts">
import { ICONS } from '../../const';

import { example } from '~/pprof/goroutines/example';
import { parse } from '~/pprof/goroutines/parser';

const emit = defineEmits(['data']);

const textareaClass = {
    'font-mono': true,
    'bg-white': true,
    'rounded': true,
    'outline': true,
    'outline-1': true,
    'outline-gray-500': true,
    'hover:outline-cyan-700': true,
    'focus:outline-cyan-700': true,
    'px-2': true,
    'py-2': true,
    'w-full': true,
    'h-64': true
};

const error = useState('error');
const disabled = useState('disabled');
const text = defineModel({ default: '' });

const setText = (value: string) => {
    text.value = value;
    error.value = null;
};

const useExampleHandler = () => {
    setText(example);
};

const pasteHandler = async () => {
    try {
        const value = await navigator.clipboard.readText();
        setText(value);
    } catch (err) {
        error.value = err;
    };
};

const clearHandler = () => {
    setText('');
};

const goHandler = () => {
    try {
        const data = parse(text.value);
        emit('data', data);
    } catch (err) {
        error.value = err;
    };
};

</script>

<template>
    <div class="mt-4 mb-2 flex items-center">
        <span class="flex-1">
            Paste your PPROF stack trace into a text field below:
        </span>
        <Button @click="useExampleHandler" text="Use an example PPROF" :icon="ICONS.USE_EXAMPLE" :disabled="disabled" />
    </div>

    <textarea :class="textareaClass" placeholder="Paste your stack trace here" v-model="text" :disabled="disabled" />

    <div class="flex gap-1">
        <Button @click="goHandler" text="Go!" :icon="ICONS.GO" :disabled="disabled" />
        <div class="flex-1"></div>
        <Button @click="pasteHandler" text="Paste from clipboard" :icon="ICONS.PASTE" :disabled="disabled" />
        <Button @click="clearHandler" text="Clear" :icon="ICONS.CLEAR" :disabled="disabled" />
    </div>

    <div class="mt-2 border-2 rounded border-red-200 bg-red-200 p-2" v-if="error">
        {{ error }}
    </div>
</template>