<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
const root = ref(null);

onMounted(() => {
  nextTick(() => {
    const element = root.value as any as HTMLElement;
    const input = element.querySelector('*') as HTMLElement;
    input.focus();
  });
});
</script>
