<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { defaultTimeFormat, TimeFormat } from './impl';
const model = defineModel<TimeFormat>({
    default: defaultTimeFormat
});

interface Option {
    name: string;
    value: TimeFormat;
}
const options: Option[] = [
    { 'name': 'ns/op', 'value': 'ns' },
    { 'name': 'us/op', 'value': 'us' },
    { 'name': 'ms/op', 'value': 'ms' },
    { 'name': 's/op', 'value': 's' },
];

function isSelected(option: Option): boolean {
    return option.value === model.value || !model.value && option.value === defaultTimeFormat;
}

function select(option: Option) {
    model.value = option.value;
}

function buttonStyle(active: boolean, first: boolean, last: boolean): any {
    let classes = 'flex border px-2 ';
    if (active) {
        classes += 'bg-cyan-700 text-white border-cyan-700 ';
    } else {
        classes += 'border-cyan-700 ';
    }
    if (first) {
        classes += 'rounded-l ';
    }
    if (last) {
        classes += 'rounded-r ';
    }
    return {
        'flex':true,
        'border':true,
        'border-cyan-700':true,
        'px-2':true,
        'bg-cyan-700': active,
        'text-white': active,
        'rounded-l': first,
        'rounded-r': last,
    };
}
</script>

<template>
    <div class="flex flex-row">
        <template v-for="option in options" :key="option.value">
            <button :class="buttonStyle(isSelected(option), option === options[0], option === options[options.length - 1])" type="button" @click="select(option)">
                {{ option.name }}
            </button>
        </template>
    </div>
</template>