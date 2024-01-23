<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ICONS } from '../../const';
defineProps({
  data: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <table
    v-if="data && data.items && data.items.length > 0"
    class="border-collapse border border-gray-500 w-full"
  >
    <thead class="bg-gray-200">
      <tr>
        <th class="px-2 py-1">
          Goroutine
          <Icon :name="ICONS.CARET_DOWN" />
        </th>
        <th class="px-2 py-1">State</th>
        <th class="px-2 py-1">Location</th>
      </tr>
    </thead>
    <tbody>
      <GoroutinesTableRow
        v-for="item in data.items"
        :key="item.id"
        :item="item"
      />
    </tbody>
  </table>
  <div class="text-gray-600 text-sm mt-2">
    Click on a goroutine to see its stack trace.
  </div>
</template>
