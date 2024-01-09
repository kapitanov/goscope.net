<script setup lang="ts">
import { ICONS } from '../const';
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <div class="flex flex-col text-center">
      <h1 class="text-4xl sm:text-6xl font-bold text-gray-900">
        Let's explore your Go programs!
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        This is a collection of interactive visualizations to help you
        understand how your Go programs work.
      </p>
      <div class="mt-10 flex flex-col items-center justify-center gap-x-6">
        <Button text="Explore goroutines" href="/goroutines" :icon-right="ICONS.ARROW_RIGHT" />
      </div>
    </div>
  </div>
</template>