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
      apiBase: ''
    }
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
    domains: ['picsum.photos', 'api.dicebear.com'],
    screens: {
      sm: 320,
      md: 480,
      lg: 640,
      xl: 960
    },
    ipx: {
      maxAge: 60 * 60 * 24 * 365
    }
  }
})
