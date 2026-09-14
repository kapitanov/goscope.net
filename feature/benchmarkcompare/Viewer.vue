<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Table from './Table.vue';
import { Comparison, asMarkdown, asText } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  isDemo: { type: Boolean, default: false }
});
const emit = defineEmits(['reset']);
const snackbar = useSnackbar();

const comparison = computed(() => props.data as Comparison);

const comparisonMarkdown = computed(() => asMarkdown(comparison.value));
const comparisonText = computed(() => asText(comparison.value));

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    snackbar.add({ text: 'Copied to clipboard', type: 'success' });
  } catch (err: any) {
    snackbar.add({ text: `Failed to copy: ${err.message || err}`, type: 'error' });
  }
}

function copyComparisonMarkdown() {
  copyText(comparisonMarkdown.value);
}
function copyComparisonText() {
  copyText(comparisonText.value);
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
      <span class="hidden md:inline">Try another comparison</span>
    </Button>
    <h1 class="md:text-2xl text-xl font-semibold">
      <span>Benchmark comparer</span>
      <span v-if="props.isDemo" class="text-gray-500 dark:text-gray-400 text-balance break-all text-base font-normal ms-2">Displaying demo data</span>
    </h1>
    <div class="grow"></div>
  </div>

  <div class="flex flex-col lg:flex-row gap-1 mt-4 mb-4">
    <Button align="center" class="grow lg:grow-0" @click="copyComparisonMarkdown">
      <Icon :name="ICONS.COPY" />
      <span class="hidden md:inline">Copy as Markdown</span>
      <Icon :name="ICONS.MARKDOWN" />
    </Button>
    <Button align="center" class="grow lg:grow-0" @click="copyComparisonText">
      <Icon :name="ICONS.COPY" />
      <span class="hidden md:inline">Copy as plain text</span>
      <Icon :name="ICONS.TEXT" />
    </Button>

    <div class="grow"></div>

    <TabBar :active="activeTab" @select="selectActiveTab">
      <TabItem name="table"> Table </TabItem>
      <TabItem name="markdown"> Markdown </TabItem>
      <TabItem name="plain"> Plain text </TabItem>
    </TabBar>
  </div>

  <div class="mt-2">
    <div v-if="activeTab === 'table'">
      <Table :data="comparison" />
    </div>
    <div v-if="activeTab === 'markdown'">
      <CodeBlock :code="comparisonMarkdown" :copyable="false" />
    </div>
    <div v-if="activeTab === 'plain'">
      <CodeBlock :code="comparisonText" :copyable="false" />
    </div>
  </div>
</template>
