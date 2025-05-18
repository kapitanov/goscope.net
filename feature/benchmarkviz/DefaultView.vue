<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import TextInput from './TextInput.vue';
import About from './About.vue';
import Viewer from './Viewer.vue';
import { Output } from './impl';

const data = ref<Output | null>(null);

const onData = (value: Output) => {
  data.value = value;
};

const onReset = () => {
  data.value = null;
};
</script>
<template>
  <div>
    <div v-if="!data">
      <div class="mt-4">
        <strong>Benchmark visualizer</strong> is a tool to display an output of <CodeInline>go test -bench</CodeInline>
        command in a pretty format, allowing you to view, understand and export results of your benchmarks.
      </div>

      <div class="mt-4">
        <About />
      </div>

      <div class="mt-4">
        <TextInput @data="onData" />
      </div>
    </div>
    <div v-else>
      <Viewer :data="data" @reset="onReset" />
    </div>
  </div>
</template>
