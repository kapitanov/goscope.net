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
          <GoroutinesHeader>
               <span class="text-gray-500">
                    Displaying demo data
               </span>
          </GoroutinesHeader>

          <GoroutinesViewer :data="data" @reset="onReset" />
     </div>
</template>
