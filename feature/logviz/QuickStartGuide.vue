<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
const jsonPayloadSample = '2026-03-17 14:28:47.365387 [ERROR] diagapi: panic while handling http request {"endpoint": "GET /favicon.ico"}';
const logfmtSample =
  'timestamp=2026-03-17T14:28:47.365387Z level=ERROR logger=diagapi msg="panic while handling http request" endpoint="GET /favicon.ico"';
const jsonLinesSample =
  '{"timestamp":"2026-03-17T14:28:47.365387Z","level":"ERROR","logger":"diagapi","msg":"panic while handling http request","endpoint":"GET /favicon.ico"}';

const features = [
  'View log entries of any of the three supported formats at once in a table',
  'Automatically detect the input format, line by line',
  'Filter by log level (errors, warnings, etc.)',
  'Search through messages and fields with fuzzy text search',
  'Filter by any structured field, such as a request path or a client IP'
];
const steps = [
  {
    number: 1,
    title: 'Collect your logs',
    description: ['Grab a batch of log lines from your application.', 'One log entry per line.']
  },
  {
    number: 2,
    title: 'Paste here',
    description: ['Copy the raw log output into the text area below.', 'No data leaves your browser.']
  },
  {
    number: 3,
    title: 'Analyze',
    description: ['View log entries in a sortable table with filtering.', 'Drill down into a single entry to see all of its fields.']
  }
];
</script>

<template>
  <QuickStartHeroBlock image-url="/images/logviz-preview.png" :features="features" />
  <QuickStartGuideBlock :steps="steps" />

  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Supported log formats</h3>
    <p>
      <strong>Log visualizer</strong> automatically detects the format of every log line you paste in, so you can even mix and match different formats
      within the same input.
    </p>

    <p class="mt-2"><strong>JSON payload</strong> - a text-prefixed line with a trailing JSON object holding extra fields:</p>
    <CodeBlock :code="jsonPayloadSample" />

    <p><strong>Logfmt</strong> - space-separated <CodeInline>key=value</CodeInline> pairs:</p>
    <CodeBlock :code="logfmtSample" />

    <p><strong>JSON Lines</strong> - the whole line is a single JSON object:</p>
    <CodeBlock :code="jsonLinesSample" />
  </div>
</template>
