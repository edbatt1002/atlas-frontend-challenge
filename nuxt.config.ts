// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/shared', './layers/professionals'],

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/test-utils/module', '@vueuse/nuxt'],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    public: {
      apiBase: ''
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
