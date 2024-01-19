<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { example } from '~/pprof/goroutines/example';
import { parse } from '~/pprof/goroutines/parser';

const emit = defineEmits(['data']);

onMounted(() => {
  const route = useRoute();
  if (route.query.demo !== undefined) {
    try {
      const data = parse(example);
      data.demo = true;
      emit('data', data);
    } catch (err) {

      /* eslint-disable no-console */
      console.error(err);
    }
  }
});
</script>

<template>
  <div class="mt-4">
    <strong>Goroutines viewer</strong> is a tool to view all goroutines in your
    application at once. It takes a snapshot of all goroutines (taken from
    PPROF) and displays them in a table form, allowing you to filter it and view
    goroutines state at glance.
  </div>

  <div class="mt-4">
    <GoroutinesAbout />
  </div>

  <GoroutinesTextInput @data="(data) => emit('data', data)" />
</template>
