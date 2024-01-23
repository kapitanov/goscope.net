<script setup lang="ts">
import * as C from '../const';
useHead({
  ...C.HEAD,
  title: C.APP_NAME,
});
</script>
<template>
    <NuxtErrorBoundary>
        <template #error="{ error }">
            <ErrorPresenter :error="error" />
        </template>

        <GoogleAnalytics>
            <header class="sticky top-0 w-100 bg-background/70 backdrop-blur px-8 pt-4 mb-8">
                <Header></Header>
            </header>

            <main>
                <section class="px-8 pb-8">
                    <NuxtPage />
                </section>

                <footer class="w-100 px-8 pb-8">
                    <Footer></Footer>
                </footer>
            </main>
        </GoogleAnalytics>
    </NuxtErrorBoundary>
</template>