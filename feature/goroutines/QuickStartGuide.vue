<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import SOURCE_CODE from /* @vite-ignore */ '~/go/goroutines/goroutines.go?raw';

const exampleSourceCode = (SOURCE_CODE as unknown as string).trim();

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

  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Don't have PPROF data yet?</h3>
    <p>Package <Hyperlink href="https://pkg.go.dev/net/http/pprof" text="pprof" /> serves via its HTTP server runtime profiling data.</p>
    <p>
      The package is typically only imported for the side effect of registering its HTTP handlers. The handled paths all begin with
      <code class="font-mono text-cyan-900 dark:text-cyan-400">/debug/pprof/</code>.
    </p>
    <p>To use pprof, link this package into your program:</p>
    <!-- eslint-disable-next-line vue/html-quotes -->
    <CodeBlock code='import _ "net/http/pprof"' />
    <p>For instance, try running the following program:</p>
    <CodeBlock :code="exampleSourceCode" />
    <p>
      <strong>Goroutines viewer</strong> needs only one of profiles data, which is <code class="font-mono text-cyan-900 dark:text-cyan-400">goroutine</code> profile in
      <code class="font-mono text-cyan-900 dark:text-cyan-400">?debug=2</code> format.
    </p>
    <p>
      To get it, run the program and open
      <Hyperlink href="http://localhost:6060/debug/pprof/goroutine?debug=2" target="_blank" />
      in your browser.
    </p>
  </div>
</template>
