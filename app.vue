<script setup lang="ts">
import * as C from './const';

useHead({
  title: C.APP_NAME,
  bodyAttrs: {
    class: 'bg-background',
  },
});
</script>
<template>
  <NuxtErrorBoundary>
    <template #error="{ error }">
      <p>An error occurred: {{ error }}</p>
    </template>

    <div class="m-8">
      <header class="w-100">
        <Header />
      </header>
      <main class="min-h-lvh mt-8">
        <NuxtPage />
      </main>
      <footer class="w-100">
        <Footer />
      </footer>
    </div>
  </NuxtErrorBoundary>
</template>