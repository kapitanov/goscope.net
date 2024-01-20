// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from 'nuxt/schema';
import {
  commitHash,
  buildDate,
  environment,
  cloudflareWebAnalyticsToken
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
      cloudflareWebAnalyticsToken
    }
  }
};

export default defineNuxtConfig({
  ...cloudflare,
  ...runtime,

  modules: ['nuxt-icon', '@nuxt/image', '@nuxtjs/tailwindcss'],
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
