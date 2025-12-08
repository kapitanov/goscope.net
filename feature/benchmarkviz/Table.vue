<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { Output, TimeFormat, asTable } from './impl';

const props = defineProps({
  data: { type: Object, default: null },
  timeFormat: { type: String, default: null }
});
const table = computed(() => (props.data && asTable(props.data as Output, { timeFormat: props.timeFormat as TimeFormat })) || null);
</script>

<template>
  <table v-if="table" class="table-auto border-collapse border border-cyan-700 mt-3 w-full">
    <thead class="bg-cyan-700 text-white">
      <tr>
        <th class="text-start ps-2">Name</th>
        <th
          v-for="(header, headerIndex) in table.headers"
          :key="header.name"
          :class="{ 'text-end': true, 'pe-2': headerIndex === table.headers.length - 1 }"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody class="font-mono text-sm">
      <tr v-for="(row, lineIndex) in table.rows" :key="line" :class="{ 'bg-gray-200': lineIndex % 2 !== 0 }">
        <td class="text-start ps-2 py-2">
          {{ row.name }}
        </td>
        <td
          v-for="(header, headerIndex) in table.headers"
          :key="header.name"
          :class="{ 'text-end': true, 'py-2': true, 'pe-2': headerIndex === table.headers.length - 1 }"
        >
          {{ row.formattedValues[headerIndex] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
