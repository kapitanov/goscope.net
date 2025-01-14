// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from 'nuxt/schema';
import { commitHash, buildDate, environment, googleAnalyticsToken, featureFlags } from './config';

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
      featureFlags,
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

  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt', 'nuxt-gtag', 'nuxt-icon', 'nuxt-snackbar'],

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
  },

  pwa: {
    strategies: 'injectManifest',
    srcDir: 'service-worker',
    filename: 'index.ts',
    registerType: 'autoUpdate',
    manifest: {
      name: 'goscope.net',
      short_name: 'goscope_net',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },

  tour: { prefix: 'V' },

  compatibilityDate: '2024-09-29'
});
