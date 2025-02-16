<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
  code: { type: String, default: '' },
  copyable: { type: Boolean, default: true },
});
</script>

<template>
  <div class="border-2 rounded bg-slate-200 p-4 my-2">
    <div v-if="props.copyable" class="float-end">
      <CopyButton :text="props.code" size="sm" />
    </div>
    <pre><code>{{ props.code }}</code></pre>
  </div>
</template>
