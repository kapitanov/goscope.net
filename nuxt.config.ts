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

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    [
      'nuxt-cloudflare-analytics',
      {
        token: process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN,
        scriptPath: false
      }
    ]
  ],
  telemetry: false,
  devtools: { enabled: true },
  css: ['~/app.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
});
