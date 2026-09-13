<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import TextInput from './TextInput.vue';
import Viewer from './Viewer.vue';
import QuickStartGuide from './QuickStartGuide.vue';
import { LogEntries } from './impl';

const data = ref<LogEntries | null>(null);

const onData = (value: LogEntries) => {
  data.value = value;

  useTrackEvent('select_content', { content_type: 'logviz', screen_name: 'default_view' });
};

const onReset = () => {
  data.value = null;
};
</script>
<template>
  <div>
    <div v-if="!data">
      <div class="mt-4">
        <strong>Log visualizer</strong> is a tool to view log entries in a table form. It automatically detects whether your logs are formatted as
        JSON payloads, logfmt or JSON Lines, and lets you filter them by level, free text or any structured field.
      </div>

      <QuickStart id="logviz-input">
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
