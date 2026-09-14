<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { exampleOld as EXAMPLE_OLD, exampleNew as EXAMPLE_NEW } from './impl';
import SOURCE_CODE from /* @vite-ignore */ '~/go/benchmark/benchmark_test.go?raw';

const exampleSourceCode = (SOURCE_CODE as unknown as string).trim();
const exampleShellOutputOld = `$ go test -bench=. > old.txt

${EXAMPLE_OLD}`;
const exampleShellOutputNew = `$ go test -bench=. > new.txt

${EXAMPLE_NEW}`;

const features = [
  'Statistical comparison powered by the Mann-Whitney U-test, just like benchstat',
  'Automatic detection of statistically significant changes',
  'Support for -benchmem and custom b.ReportMetric() metrics',
  'Export the comparison to Markdown or plain text',
  'Everything runs locally, right in your browser'
];
const steps = [
  {
    number: 1,
    title: 'Run twice',
    description: ['Run your benchmark before and after your change', 'go test -bench=.']
  },
  {
    number: 2,
    title: 'Copy both outputs',
    description: ['Copy the complete console output of each run', 'Include goos, goarch, pkg info']
  },
  {
    number: 3,
    title: 'Compare',
    description: ['See what changed, by how much, and whether it matters', 'Export the summary to share it']
  }
];
</script>

<template>
  <QuickStartHeroBlock image-url="/images/benchmark-compare-preview.png" :features="features" />
  <QuickStartGuideBlock :steps="steps" />

  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Don't have two benchmark runs yet?</h3>
    <p>Run the very same benchmark twice: once before your change, once after it. For instance, try running the following test file:</p>
    <CodeBlock :code="exampleSourceCode" />
    <p>Save this file as <CodeInline>benchmark_test.go</CodeInline>, then run it before and after your change:</p>
    <CodeBlock :code="exampleShellOutputOld" />
    <CodeBlock :code="exampleShellOutputNew" />
    <p>
      For more information about Go benchmarks, please refer to
      <Hyperlink href="https://pkg.go.dev/testing#hdr-Benchmarks" target="_blank" text="the official documentation" />.
    </p>
  </div>
</template>
