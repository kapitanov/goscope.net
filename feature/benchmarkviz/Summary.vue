<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
    data: { type: Object, default: null }
});
</script>

<template>
    <div class="flex flex-row gap-1">
        <Badge name="pkg" :value="props.data.pkg" />
        <Badge name="os" :value="props.data.goos" />
        <Badge name="arch" :value="props.data.goarch" />
        <Badge name="cpu" :value="props.data.cpu" />
    </div>
</template>