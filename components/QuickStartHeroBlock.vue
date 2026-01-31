<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const props = defineProps({
  imageUrl: { type: String, default: null },
  features: { type: Array as () => string[], required: true }
});
</script>

<template>
  <div class="flex flex-row">
    <div class="w-1/2 border border-gray-200">
      <img :src="props.imageUrl" alt="Preview" class="w-full" />
    </div>

    <div class="grow pl-8">
      <h3 class="text-lg font-semibold mb-3 text-gray-800 flex items-center">What you'll get</h3>
      <ul class="ml-8 list-disc space-y-3">
        <li v-for="feature in props.features" :key="feature">{{ feature }}</li>
      </ul>
    </div>
  </div>
</template>
