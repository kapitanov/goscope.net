<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Summary from './Summary.vue';
import Table from './Table.vue';
import TimeFormatSelector from './TimeFormatSelector.vue';
import { Output, asMarkdown, asText, wrapIntoComments, TimeFormat } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  isDemo: { type: Boolean, default: false }
});
const emit = defineEmits(['reset']);
const snackbar = useSnackbar();

const timeFormat = ref('ns' as TimeFormat);
const markdownTextRepresentation = computed(() => asMarkdown(props?.data as Output, { timeFormat: timeFormat.value }));
const plainTextRepresentation = computed(() => asText(props?.data as Output, { timeFormat: timeFormat.value }));

async function copyHandler(print: (output: Output) => string) {
  const data = props.data as Output;
  if (!data) {
    return;
  }

  try {
    const text = print(data);
    await navigator.clipboard.writeText(text);
    snackbar.add({
      text: 'Copied to clipboard',
      type: 'success'
    });
  } catch (err: any) {
    snackbar.add({
      text: `Failed to copy: ${err.message || err}`,
      type: 'error'
    });
  }
}

function copyMarkdownHandler() {
  copyHandler((data) => asMarkdown(data));
}
function copyPlainTextHandler() {
  copyHandler((data) => asText(data));
}
function copyCommentTextHandler() {
  copyHandler((data) => wrapIntoComments(asText(data)));
}

const activeTab = ref('table');
const selectActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="flex gap-2 lg:items-end lg:flex-row flex-col mb-4">
    <Button align="center" class="grow lg:grow-0" @click="emit('reset')">
      <Icon :name="ICONS.RESET" />
      <span class="hidden md:inline">Try another benchmark</span>
    </Button>
    <h1 class="md:text-2xl text-xl font-semibold">
      <span>Benchmark viewer</span>
      <span v-if="props.isDemo" class="text-gray-500 text-balance break-all text-base font-normal ms-2">Displaying demo data</span>
    </h1>
    <div class="grow"></div>
  </div>

  <div class="flex flex-col lg:flex-row gap-1 mt-4 mb-4">
    <Button align="center" class="grow lg:grow-0" @click="copyMarkdownHandler">
      <Icon :name="ICONS.COPY" />
      <span class="hidden md:inline">Copy as MarkDown</span>
      <Icon :name="ICONS.MARKDOWN" />
    </Button>
    <Button align="center" class="grow lg:grow-0" @click="copyPlainTextHandler">
      <Icon :name="ICONS.COPY" />
      <span class="hidden md:inline">Copy as plain text</span>
      <Icon :name="ICONS.TEXT" />
    </Button>
    <Button align="center" class="grow lg:grow-0" @click="copyCommentTextHandler">
      <Icon :name="ICONS.COPY" />
      <span class="hidden md:inline">Copy as code comments</span>
      <Icon :name="ICONS.CODE" />
    </Button>

    <div class="grow"></div>

    <TabBar :active="activeTab" @select="selectActiveTab">
      <TabItem name="table"> Table </TabItem>
      <TabItem name="markdown"> Markdown </TabItem>
      <TabItem name="plain"> Plain text </TabItem>
    </TabBar>
  </div>

  <div class="mt-2">
    <div class="flex flex-row gap-1">
      <Summary :data="data" />
      <div class="grow"></div>
      <TimeFormatSelector v-model="timeFormat" />
    </div>
  </div>

  <div class="mt-2">
    <div v-if="activeTab === 'table'">
      <Table :data="data" :timeFormat="timeFormat" />
    </div>
    <div v-if="activeTab === 'markdown'">
      <CodeBlock :code="markdownTextRepresentation" :copyable="false" />
    </div>
    <div v-if="activeTab === 'plain'">
      <CodeBlock :code="plainTextRepresentation" :copyable="false" />
    </div>
  </div>
</template>
