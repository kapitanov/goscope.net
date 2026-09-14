<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
  code: { type: String, default: '' },
  copyable: { type: Boolean, default: true }
});
</script>

<template>
  <div class="border-2 rounded border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-4 my-2">
    <div v-if="props.copyable" class="float-end">
      <CopyButton :text="props.code" size="sm" />
    </div>
    <pre><code>{{ props.code }}</code></pre>
  </div>
</template>
