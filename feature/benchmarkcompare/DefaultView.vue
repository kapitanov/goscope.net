<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import TextInput from './TextInput.vue';
import Viewer from './Viewer.vue';
import QuickStartGuide from './QuickStartGuide.vue';
import { Comparison, Output, compare } from './impl';

const data = ref<Comparison | null>(null);

const onData = (value: { old: Output; new: Output }) => {
  data.value = compare(value.old, value.new);

  useTrackEvent('select_content', { content_type: 'benchmark_compare', screen_name: 'default_view' });
};

const onReset = () => {
  data.value = null;
};
</script>
<template>
  <div>
    <div v-if="!data">
      <div class="mt-4">
        <strong>Benchmark comparer</strong> compares two <CodeInline>go test -bench</CodeInline> outputs and highlights what changed, by how much, and
        whether the difference is statistically significant - much like <CodeInline>benchstat</CodeInline>, right in your browser.
      </div>

      <QuickStart id="benchmarkcompare-input">
        <QuickStartGuide />
      </QuickStart>

      <div class="mt-4">
        <TextInput @data="onData" />
      </div>
    </div>
    <div v-else>
      <Viewer :data="data" @reset="onReset" />
    </div>
  </div>
</template>
