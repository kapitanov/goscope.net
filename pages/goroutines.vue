<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const data = useState('data');
const onData = (value: string) => {
  data.value = value;
};
const onReset = () => {
  data.value = null;
};
</script>
<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <div class="flex-1 flex flex-col">
        <h1 class="text-3xl sm:text-xl font-semibold">Goroutines viewer</h1>
      </div>
    </div>

    <GoroutinesInput v-if="!data" @data="onData" />

    <GoroutinesViewer v-if="data" :data="data" @reset="onReset" />
  </div>
</template>
