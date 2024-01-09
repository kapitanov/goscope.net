<script setup lang="ts">
const props = defineProps(['placeholder', 'type']);

const inputClass = {
    'bg-white': true,
    'rounded': true,
    'hover:outline-cyan-700': true,
    'focus:outline-cyan-700': true,
    'px-2': true,
    'py-1': true,
};
</script>

<template>
    <div>
        <input type="text" :placeholder="props.placeholder" :class="inputClass" v-if="!type || type == 'inline'" />
        <input type="text" :placeholder="props.placeholder" :class="{ 'w-full': true, ...inputClass }"
            v-if="type == 'wide'" />

        <textarea :placeholder="props.placeholder" :class="{ 'w-full': true, 'h-64': true, ...inputClass }"
            v-if="type === 'textarea'" />
    </div>
</template>