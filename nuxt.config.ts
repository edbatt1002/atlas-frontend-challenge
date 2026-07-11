// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/shared'],

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/test-utils/module'],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    public: {
      apiBase: '',
      dataAdapter: 'tanstack'
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  devServer: {
    port: Number(process.env.PORT) || 3000
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
