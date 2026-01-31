<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
interface Step {
  number: number;
  title: string;
  description: string[];
}
const props = defineProps({
  steps: { type: Array as () => Step[], required: true }
});
</script>

<template>
  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">How it works</h3>
    <div class="flex flex-row space-x-1">
      <template v-for="step in props.steps" :key="step.number">
        <div class="w-1/3 border border-gray-200 bg-white rounded p-4 flex flex-row">
          <div>
            <div class="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {{ step.number }}
            </div>
          </div>
          <div class="grow ml-2">
            <h3 class="font-bold">
              {{ step.title }}
            </h3>
            <p v-for="text in step.description" :key="text" class="text-sm text-gray-600">
              {{ text }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
