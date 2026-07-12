import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['layers/**/app/**/*.{ts,vue}'],
      exclude: [
        '**/__tests__/**',
        '**/types.ts',
        '**/*.config.*',
        'layers/**/mock/**'
      ]
    }
  }
})
