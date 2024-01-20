// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from 'nuxt/schema';
import { commitHash, buildDate } from './version';

const cloudflare: NuxtConfig = {
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
};

const runtime: NuxtConfig = {
  runtimeConfig: {
    public: {
      environment: process.env.ENV || 'PRODUCTION',
      commitHash: commitHash || '?',
      buildDate: buildDate || '<Now>'
    }
  }
};

export default defineNuxtConfig({
  ...cloudflare,
  ...runtime,

  modules: ['nuxt-icon', '@nuxtjs/sitemap', '@nuxt/image'],
  telemetry: false,
  devtools: { enabled: true },
  css: ['~/app.css'],
  ssr: true,
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
