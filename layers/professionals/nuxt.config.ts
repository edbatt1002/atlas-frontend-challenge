import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  $meta: {
    name: 'professionals'
  },

  imports: {
    dirs: [fileURLToPath(new URL('./app/composables/**', import.meta.url))]
  }
})
