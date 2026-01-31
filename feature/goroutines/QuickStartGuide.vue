<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const features = [
  'View states of all goroutines at once in a diagram',
  'Filter by goroutine state (running, waiting, etc.)',
  'Search through stack traces',
  'View full stack traces - or just the top functions'
];
const steps = [
  {
    number: 1,
    title: 'Get PPROF data',
    description: ['Generate a goroutine dump from your Go application.', 'Visit "/debug/pprof/goroutine?debug=2".']
  },
  {
    number: 2,
    title: 'Paste here',
    description: ['Copy the raw PPROF output into the text area below.', 'No data leaves your browser.']
  },
  {
    number: 3,
    title: 'Analyze',
    description: ['View goroutines in a sortable table with filtering.', "Understand your app's concurrency."]
  }
];
</script>

<template>
  <QuickStartHeroBlock image-url="/images/goroutines-preview.png" :features="features" />
  <QuickStartGuideBlock :steps="steps" />
</template>
