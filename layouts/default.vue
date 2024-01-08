<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import * as C from '../const';
useHead({
  ...C.HEAD,
  title: C.APP_NAME
});
</script>
<template>
  <NuxtErrorBoundary>
    <template #error="{ error }">
      <ErrorPresenter :error="error" />
    </template>

    <GoogleAnalytics>
      <header
        class="sticky top-0 w-full h-16 border-b border-gray-500 bg-white px-8 mb-8"
      >
        <PageHeader />
      </header>

      <main>
        <section class="px-8 pb-8 min-h-[100vh]">
          <NuxtPage />
        </section>

        <footer class="w-100 px-8 pb-8">
          <PageFooter />
        </footer>
      </main>
    </GoogleAnalytics>
  </NuxtErrorBoundary>
</template>
