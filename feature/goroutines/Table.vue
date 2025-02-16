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
      <div class="w-16 text-nowrap">
        #
        <Icon :name="ICONS.CARET_DOWN" />
      </div>
      <div class="hidden md:block w-48">State</div>
      <div class="block md:hidden grow">State</div>
      <div class="hidden md:block grow">Stack trace</div>
    </div>

    <TableRow v-for="item in data.items" :key="item.id" :item="item" />
  </div>

  <div v-if="data && data.items && data.items.length !== data.total" class="text-gray-900 mt-2">
    Displaying {{ data?.items?.length }} of {{ data?.total }} goroutines.
  </div>

  <div v-if="data && data.items && data.items.length === data.total" class="text-gray-900 mt-2">Displaying all {{ data?.total }} goroutines.</div>

  <div class="text-gray-600 text-sm mt-2">
    Click on a goroutine to see its stack trace. Runnable goroutines are highlighted <span class="text-green-900">in green</span>, non-runnable -
    <span class="text-red-900">in red</span>.
  </div>
</template>
