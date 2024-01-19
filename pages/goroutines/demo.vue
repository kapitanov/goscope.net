<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { example } from '~/pprof/goroutines/example';
import { parse } from '~/pprof/goroutines/parser';

const data = useState('goroutines-demo-data');

try {
    data.value = parse(example);
} catch (err: any) {
    showError(err);
}
</script>
<template>
    <div>
        <GoroutinesHeader />

        <GoroutinesViewer :data="data" :demo="true" />
    </div>
</template>
