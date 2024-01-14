// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@nuxtjs/sitemap', '@nuxt/image'],
  telemetry: false,
  devtools: { enabled: true },
  css: ['~/app.css'],
  ssr: false,
  target: 'static',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  site: {
    url: 'https://goscope.net'
  },
  sitemap: {
    hostname: 'https://goscope.net',
    gzip: true,
    routes: ['/', '/goroutines']
  },
  router: {
    mode: 'history'
  }
});
