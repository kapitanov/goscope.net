<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { example as EXAMPLE_OUTPUT } from './impl';
import SOURCE_CODE from /* @vite-ignore */ '~/go/benchmark/benchmark_test.go?raw';

const exampleSourceCode = (SOURCE_CODE as unknown as string).trim();
const exampleShellOutput = `$ go test -bench=.

${EXAMPLE_OUTPUT}`;

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

  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Don't have a benchmark yet?</h3>
    <p>
      Golang offers a built-in benchmarking framework as a part of the <CodeInline>testing</CodeInline> package. For instance, try running the
      following test file:
    </p>
    <CodeBlock :code="exampleSourceCode" />
    <p>Save this file as <CodeInline>benchmark_test.go</CodeInline>, then run it with <CodeInline>go test -bench=.</CodeInline> command:</p>
    <CodeBlock :code="exampleShellOutput" />
    <p>
      For more information, please refer to
      <Hyperlink href="https://pkg.go.dev/testing#hdr-Benchmarks" target="_blank" text="the official documentation" />.
    </p>
  </div>
</template>
