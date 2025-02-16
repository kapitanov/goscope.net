<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '../const';
import { features } from '../composables/useFeatureFlag';
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <div class="mb-4 bg-cyan-900 rounded">
      <div class="flex flex-col text-center mb-4">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-100">
          <Icon :name="ICONS.GOLANG" size="2em" /> scope
        </h1>
        <h2 class="text-2xl sm:text-4xl font-bold text-gray-100">
          Let's explore your Go programs!
        </h2>
        <div class="mt-6 text-lg text-gray-300">
          This is a collection of interactive visualizations to help you
          understand how your Go programs work.
        </div>
      </div>
    </div>

    <HeroBlock v-feature="features.GOROUTINES" image-src="/images/goroutines-preview.png" title-text="Goroutines viewer"
      button-text="Explore goroutines" href="/goroutines" demo-text="Try demo" demo-href="/goroutines/demo">
      <div>
        Dig into goroutines of your program:

        <ul class="list-disc ms-8 mt-2">
          <li>View all goroutines at glance</li>
          <li>Find out state of each goroutine</li>
          <li>Filter goroutines to find the one you are interested in</li>
          <li>Identify a goroutine by its stack trace</li>
        </ul>
      </div>
    </HeroBlock>

    <HeroBlock v-feature="features.BENCHMARK_VISUALIZER" image-src="/images/benchmarkviz-preview.png" title-text="Benchmark viewer"
      button-text="View a benchmark results" href="/benchmark" demo-text="Try demo" demo-href="/benchmark/demo" mirror="true">
      <div>
        Visualize your Go benchmark results:

        <ul class="list-disc ms-8 mt-2">
          <li>View benchmark results in a form of pretty printed table</li>
          <li>Format them into Markdown to paste into your documentation or blog posts</li>
          <li>Format them as a plain text with neat alignment</li>
        </ul>
      </div>
    </HeroBlock>
  </div>
</template>
