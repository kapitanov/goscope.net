<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '../../const';
import SOURCE_CODE from /* @vite-ignore */ '../../pprof/go/goroutines/goroutines.go?raw';
const exampleSourceCode = (SOURCE_CODE as unknown as string).trim();

const isExpanded = useState('goroutines-about-isExpanded');

const clickHandler = () => {
  isExpanded.value = !isExpanded.value;
};

const clickable = {
  'text-cyan-700': true,
  'hover:text-cyan-600': true,
  'active:text-cyan-800': true,
  flex: true,
  'items-center': true
};
</script>
<template>
  <a href="" :class="clickable" @click.prevent="clickHandler">
    <Icon :name="ICONS.QUESTION" />
    What is PPROF and how do I get it?
  </a>

  <div v-if="isExpanded" class="mt-4">
    <p>
      Package
      <Hyperlink href="https://pkg.go.dev/net/http/pprof" text="pprof" /> serves
      via its HTTP server runtime profiling data.
    </p>
    <p>
      The package is typically only imported for the side effect of registering
      its HTTP handlers. The handled paths all begin with
      <code class="font-mono text-cyan-900">/debug/pprof/</code>.
    </p>

    <p>To use pprof, link this package into your program:</p>

    <!-- eslint-disable-next-line vue/html-quotes -->
    <Code code='import _ "net/http/pprof"' />

    <p>For instance, try running the following program:</p>

    <Code :code="exampleSourceCode" />

    <p>
      <strong>Goroutines viewer</strong> needs only one of profiles data, which
      is <code class="font-mono text-cyan-900">goroutine</code> profile in
      <code class="font-mono text-cyan-900">?debug=2</code> format.
    </p>

    <p>
      To get it, run the program and open
      <Hyperlink
        href="http://localhost:6060/debug/pprof/goroutine?debug=2"
        target="_blank"
      />
      in your browser.
    </p>
  </div>
</template>
