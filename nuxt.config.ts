// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from 'nuxt/schema';
import { commitHash, buildDate, environment, googleAnalyticsToken, featureFlags } from './config';
import { APP_NAME, APP_NAME_SHORT, listAllIcons } from './const';

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

  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vite-pwa/nuxt', 'nuxt-gtag', '@nuxt/icon', 'nuxt-snackbar', '@nuxt/eslint'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'goscope-color-mode'
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
    provider: 'none',
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      icons: listAllIcons()
    }
  },

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
      name: APP_NAME,
      short_name: APP_NAME_SHORT,
      display: 'standalone',
      theme_color: '#0e7490',
      background_color: '#ffffff',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'android-chrome-512x512.png',
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

  eslint: {
    rules: {
      semi: ['off'],
      'space-before-function-paren': ['off'],
      'vue/max-attributes-per-line': ['off'],
      'vue/singleline-html-element-content-newline': ['off'],
      'vue/html-indent': ['off'],
      'vue/first-attribute-linebreak': ['off'],
      'vue/html-closing-bracket-newline': ['off']
    }
  },

  compatibilityDate: '2024-09-29'
});
