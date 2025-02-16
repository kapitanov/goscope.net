<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
    data: { type: Object, default: null }
});
</script>

<template>
    <table class="table-auto border-collapse border border-cyan-700 mt-3 w-full">
        <thead class="bg-cyan-700 text-white">
            <tr>
                <th class="text-start ps-2">
                    Name
                </th>
                <th v-for="property, propertyIndex in props.data.properties" :key="property"
                    :class="{ 'text-end': true, 'pe-2': propertyIndex === props.data.properties.length - 1 }">
                    {{ property.name }}
                </th>
            </tr>
        </thead>
        <tbody class="font-mono text-sm">
            <tr v-for="line, lineIndex in props.data.lines" :key="line" :class="{ 'bg-gray-200': (lineIndex % 2) !== 0 }">
                <td class="text-start ps-2 py-2">
                    {{ line.name }}
                </td>
                <td v-for="property, propertyIndex in props.data.properties" :key="property"
                    :class="{ 'text-end': true, 'py-2': true, 'pe-2': propertyIndex === props.data.properties.length - 1 }">
                    {{ line.formattedValues[propertyIndex] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
