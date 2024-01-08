// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from 'nuxt/schema';
import {
  commitHash,
  buildDate,
  environment,
  googleAnalyticsToken
} from './config';

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
      environment,
      commitHash,
      buildDate,
      googleAnalyticsToken
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
    'nuxt-gtag',
    'nuxt-snackbar'
  ],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
  gtag: {
    id: googleAnalyticsToken,
    loadingStrategy: 'async',
    initCommands: [
      [
        'consent',
        'default',
        {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied'
        }
      ]
    ]
  },
  telemetry: false,
  ssr: true,
  devtools: { enabled: true },
  sourcemap: { client: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
});
