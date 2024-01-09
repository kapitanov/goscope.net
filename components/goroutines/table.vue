<script setup lang="ts">
import { ICONS } from '../../const';

const props = defineProps(['data']);
</script>

<template>
    <table class="border-collapse border border-gray-500 w-full" v-if="data && data.items && data.items.length > 0">
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
            <GoroutinesTableRow v-for="item in data.items" :key="item.id" :item="item" />
        </tbody>
    </table>
</template>