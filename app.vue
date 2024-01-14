<script setup lang="ts">
import * as C from './const';

useHead({
  title: C.APP_NAME,
  bodyAttrs: {
    class: 'bg-background'
  },
  link: [
    // Favicon
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0e7490' },

    // Sitemap
    {
      rel: 'sitemap',
      type: 'application/xml',
      title: 'Sitemap',
      href: '/sitemap.xml'
    }
  ],
  meta: [
    // App theme
    { name: 'theme-color', content: '#0e7490' },
    { name: 'msapplication-TileColor', content: '#ffffff' }
  ]
});
</script>
<template>
  <NuxtErrorBoundary>
    <template #error="{ error }">
      <p>An error occurred: {{ error }}</p>
    </template>

    <header
      class="sticky top-0 w-100 bg-background/30 backdrop-blur px-8 pt-8 mb-8"
    >
      <Header />
    </header>

    <main>
      <section class="px-8 pb-8">
        <NuxtPage />
      </section>

      <footer class="w-100 px-8 pb-8">
        <Footer />
      </footer>
    </main>
  </NuxtErrorBoundary>
</template>
