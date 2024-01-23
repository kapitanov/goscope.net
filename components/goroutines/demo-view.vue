<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { example } from '~/pprof/goroutines/example';
import { parse } from '~/pprof/goroutines/parser';
const router = useRouter();

const data = parse(example);

const onReset = () => {
    router.push('/goroutines');
};
</script>

<template>
     <div>
          <div class="flex items-center mb-4">
               <div class="flex gap-2 items-center">
                    <h1 class="text-3xl sm:text-xl font-semibold">Goroutines viewer</h1>
                    <span class="text-gray-500 px-2 py-1">
                         Displaying demo data
                    </span>
               </div>
          </div>

          <GoroutinesViewer :data="data" @reset="onReset" />
     </div>
</template>
