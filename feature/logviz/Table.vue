<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TableRow from './TableRow.vue';
import { ICONS } from '~/const';

defineProps({
  data: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <div v-if="data && data.items && data.items.length > 0" class="flex flex-col border border-cyan-700">
    <div class="flex flex-row bg-cyan-700 text-white gap-2 px-2 py-1 font-bold">
      <div class="w-6"></div>
      <div class="hidden md:block w-44 text-nowrap">Timestamp</div>
      <div class="w-20 text-nowrap">
        Level
        <Icon :name="ICONS.CARET_DOWN" />
      </div>
      <div class="hidden lg:block w-32">Logger</div>
      <div class="hidden md:block grow">Message</div>
      <div class="block md:hidden grow">Entry</div>
    </div>

    <TableRow v-for="item in data.items" :key="item.index" :item="item" />
  </div>

  <div v-if="data && data.items && data.items.length !== data.total" class="text-gray-900 mt-2">
    Displaying {{ data?.items?.length }} of {{ data?.total }} log entries.
  </div>

  <div v-if="data && data.items && data.items.length === data.total" class="text-gray-900 mt-2">Displaying all {{ data?.total }} log entries.</div>

  <div class="text-gray-600 text-sm mt-2">
    Click on a log entry to see all of its fields. Errors are highlighted <span class="text-red-900">in red</span>, warnings -
    <span class="text-yellow-700">in yellow</span>.
  </div>
</template>
