<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const data = useState('goroutines-data');
const onData = (value: string) => {
  data.value = value;
};
const onReset = () => {
  data.value = null;
};
</script>
<template>
  <div>
    <GoroutinesHeader />

    <GoroutinesInput v-if="!data" @data="onData" />

    <GoroutinesViewer v-if="data" :data="data" @reset="onReset" />
  </div>
</template>
