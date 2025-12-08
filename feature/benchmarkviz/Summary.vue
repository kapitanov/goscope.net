<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
  data: { type: Object, default: null }
});
</script>

<template>
  <div class="flex flex-row gap-1">
    <Badge v-if="props.data.pkg" name="pkg" :value="props.data.pkg" />
    <Badge v-if="props.data.goos" name="os" :value="props.data.goos" />
    <Badge v-if="props.data.goarch" name="arch" :value="props.data.goarch" />
    <Badge v-if="props.data.cpu" name="cpu" :value="props.data.cpu" />
  </div>
</template>
