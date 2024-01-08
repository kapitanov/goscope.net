<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import * as C from './const';

useHead({
  ...C.HEAD,
  title: `Error! - ${C.APP_NAME}`
});

const props = defineProps({
  error: { type: Object, default: null }
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="absolute flex justify-center p-4 top-0 bottom-0 left-0 right-0">
    <div class="lg:w-6/12 w-full">
      <ErrorPresenter :error="props.error">
        <Button color="danger" @click="handleError">Clear errors</Button>
      </ErrorPresenter>
    </div>
  </div>
</template>
