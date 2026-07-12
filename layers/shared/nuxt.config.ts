import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  $meta: {
    name: 'shared'
  },

  imports: {
    dirs: [fileURLToPath(new URL('./app/composables/**', import.meta.url))]
  },

  css: [
    'swiper/css',
    fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))
  ],

  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google'
      },
      {
        name: 'Bricolage Grotesque',
        provider: 'google'
      }]
  }
})
