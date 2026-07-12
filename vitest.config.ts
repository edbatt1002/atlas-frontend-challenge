import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.nuxt/**', '**/.output/**', 'e2e/**', 'layers/*/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 85,
        lines: 90
      },
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
