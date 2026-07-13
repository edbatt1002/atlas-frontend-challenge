// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    './layers/shared',
    './layers/institutional',
    './layers/support',
    './layers/favorites',
    './layers/professionals'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/image'
  ],

  devtools: {
    enabled: true
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  runtimeConfig: {
    public: {
      apiBase: '',
      imageSource: process.env.NUXT_PUBLIC_IMAGE_SOURCE || 'local'
    }
  },

  routeRules: {
    ...(process.env.NODE_ENV === 'production' ? { '/': { swr: 60 * 60 * 24 } } : {}),
    '/termos': { prerender: true },
    '/privacidade': { prerender: true },
    '/suporte': { prerender: true },
    '/favoritos': { prerender: true }
  },

  devServer: {
    port: Number(process.env.PORT) || 3000
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    compressPublicAssets: true
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals']
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  image: {
    provider: 'none'
  }
})
