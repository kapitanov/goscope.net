<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Summary from './Summary.vue';
import Table from './Table.vue';
import { Output, asMarkdown, asText, wrapIntoComments } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  isDemo: { type: Boolean, default: false }
});
const emit = defineEmits(['reset']);
const snackbar = useSnackbar();

const markdownTextRepresentation = computed(() => asMarkdown(props?.data as Output));
const plainTextRepresentation = computed(() => asText(props?.data as Output));

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
  <div class="flex items-center mb-4">
    <div class="flex gap-2 lg:items-end lg:flex-row flex-col">
      <h1 class="md:text-2xl text-xl font-semibold">Benchmark viewer</h1>
      <TabBar :active="activeTab" @select="selectActiveTab">
        <TabItem name="table"> Table </TabItem>
        <TabItem name="markdown"> Markdown </TabItem>
        <TabItem name="plain"> Plain text </TabItem>
      </TabBar>
      <div class="text-gray-500 text-balance break-all">
        <span v-if="props.isDemo">Displaying demo data</span>
      </div>
    </div>
  </div>

  <div class="flex flex-col lg:flex-row gap-1 mt-4 mb-2">
    <div class="flex flex-row gap-1 mb-1 justify-items-stretch lg:justify-items-start">
      <Button align="center" class="grow lg:grow-0" @click="emit('reset')">
        <Icon :name="ICONS.RESET" />
        <span class="hidden md:inline">Try another benchmark</span>
      </Button>
    </div>

    <div class="grow"></div>

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
  </div>

  <div class="mt-2">
    <div v-if="activeTab === 'table'">
      <Summary :data="data" />
      <Table :data="data" />
    </div>
    <div v-if="activeTab === 'markdown'">
      <CodeBlock :code="markdownTextRepresentation" :copyable="false" />
    </div>
    <div v-if="activeTab === 'plain'">
      <CodeBlock :code="plainTextRepresentation" :copyable="false" />
    </div>
  </div>
</template>
