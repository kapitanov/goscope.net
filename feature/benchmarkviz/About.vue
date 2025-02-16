<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '../../const';
import { example as EXAMPLE_OUTPUT } from './impl';
import SOURCE_CODE from /* @vite-ignore */ '~/go/benchmark/benchmark_test.go?raw';

const exampleSourceCode = (SOURCE_CODE as unknown as string).trim();
const exampleShellOutput = `$ go test -bench=.

${EXAMPLE_OUTPUT}`;

const isExpanded = ref(false);

const clickHandler = () => {
    isExpanded.value = !isExpanded.value;
};

const collapseButton = {
    border: true,
    'px-4': true,
    'text-cyan-700': true,
    'bg-gray-200': true,
    'border-gray-500': true,
    'hover:bg-cyan-600': true,
    'hover:text-white': true,
    'hover:bg-cyan-800': true,
    'active:text-white': true
};

const collapseButtonTop = {
    ...collapseButton,
    'border-t-0': true,
    'rounded-bl': true,
    'rounded-br': true
};

const collapseButtonBottom = {
    ...collapseButton,
    'border-b-0': true,
    'rounded-tl': true,
    'rounded-tr': true
};
</script>
<template>
    <Button v-if="!isExpanded" @click="clickHandler">
        <Icon :name="ICONS.QUESTION" />
        What are benchmark results and how do I get them?
    </Button>

    <div v-if="isExpanded" class="mt-4 px-4 rounded border border-gray-500">
        <div class="flex justify-center w-full">
            <button :class="collapseButtonTop" @click="clickHandler">
                <Icon :name="ICONS.COLLAPSE" />
            </button>
        </div>

        <div class="py-4">
            <p>
                Golang offers a built-in benchmarking framework as a part of <CodeInline>testing</CodeInline> package.
            </p>

            <p>
                For instance, try running the following test file:
            </p>

            <CodeBlock :code="exampleSourceCode" />

            <p>
                Save this file as <CodeInline>benchmark_test.go</CodeInline>,
                then run it with <CodeInline>go run -bench=.</CodeInline> command:
            </p>

            <CodeBlock :code="exampleShellOutput" />

            <p>
                For more information, please refer to
                <Hyperlink href="https://pkg.go.dev/testing#hdr-Benchmarks" target="_blank"
                    text="the official documentation" />.
            </p>
        </div>
        <div class="flex justify-center w-full">
            <button :class="collapseButtonBottom" @click="clickHandler">
                <Icon :name="ICONS.COLLAPSE" />
            </button>
        </div>
    </div>
</template>
