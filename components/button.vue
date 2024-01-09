<script setup>
const emit = defineEmits(['click']);
const props = defineProps(['text', 'disabled', 'title', 'href', 'icon', 'iconRight']);
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
const noClickable = {
    'border-gray-400': true,
    'text-gray-700': true,
    'bg-gray-400': true,
    'cursor-not-allowed': true,
};
const isHref = computed(() => !!props.href);
const isDisabled = computed(() => !!props.disabled);
</script>

<template>
    <a :href="href" :class="{ ...clickable, ...layout }" :title="title" v-if="isHref && !isDisabled">
        <span class="flex items-center">
            <Icon :name="icon" v-if="icon" />
            <span class="mx-1" v-if="text">{{ text }}</span>
            <Icon :name="iconRight" v-if="iconRight" />
        </span>
    </a>
    <button :class="{ ...clickable, ...layout }" :title="title" v-if="!isHref && !isDisabled" @click="emit('click')">
        <span class="flex items-center">
            <Icon :name="icon" v-if="icon" />
            <span class="mx-1" v-if="text">{{ text }}</span>
            <Icon :name="iconRight" v-if="iconRight" />
        </span>
    </button>
    <span :class="{ ...noClickable, ...layout }" :title="title" v-if="isDisabled">
        <span class="flex items-center">
            <Icon :name="icon" v-if="icon" />
            <span class="mx-1" v-if="text">{{ text }}</span>
            <Icon :name="iconRight" v-if="iconRight" />
        </span>
    </span>
</template>