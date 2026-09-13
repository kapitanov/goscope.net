<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { Comparison, renderTable } from './impl';

const props = defineProps({
  data: { type: Object, default: null }
});
const comparison = computed(() => props.data as Comparison | null);
const table = computed(() => (comparison.value ? renderTable(comparison.value) : null));
</script>

<template>
  <table v-if="table" class="table-auto border-collapse border border-cyan-700 w-full">
    <thead class="bg-cyan-700 text-white">
      <tr>
        <th class="text-start ps-2">{{ table.headers[0] }}</th>
        <th
          v-for="(header, headerIndex) in table.headers.slice(1)"
          :key="header"
          :class="{ 'text-end': true, 'pe-2': headerIndex === table.headers.length - 2 }"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="font-mono text-sm">
      <tr v-for="(row, rowIndex) in table.rows" :key="row.name" :class="{ 'bg-gray-200': rowIndex % 2 !== 0 }">
        <td class="text-start ps-2 py-2">{{ row.name }}</td>
        <td
          v-for="(cell, cellIndex) in row.cells"
          :key="cellIndex"
          :class="{ 'text-end': true, 'py-2': true, 'pe-2': cellIndex === row.cells.length - 1 }"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
