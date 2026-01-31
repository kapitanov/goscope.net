<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const features = [
  'Clean table format with aligned columns',
  'Performance metrics breakdown (ns/op, B/op, allocs/op)',
  'Export to Markdown for documentation',
  'Export to formatted plain text',
  'Copy individual results to clipboard'
];
const steps = [
  {
    number: 1,
    title: 'Run benchmarks',
    description: ['Execute your Go benchmark tests with the bench flag', 'go test -bench=.']
  },
  {
    number: 2,
    title: 'Copy output',
    description: ['Copy the complete console output including metadata', 'Include goos, goarch, pkg info']
  },
  {
    number: 3,
    title: 'Visualize',
    description: ['View results in a formatted table with export options', 'Export to Markdown or plain text']
  }
];
</script>

<template>
  <QuickStartHeroBlock image-url="/images/benchmarkviz-preview.png" :features="features" />
  <QuickStartGuideBlock :steps="steps" />
</template>
