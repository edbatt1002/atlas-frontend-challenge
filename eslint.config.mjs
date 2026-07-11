// @ts-check
import boundaries from 'eslint-plugin-boundaries'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['design/**']
}).append({
  files: ['layers/**/*.{ts,vue}', 'app/**/*.{ts,vue}'],
  plugins: { boundaries },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['.nuxt/tsconfig.app.json', '.nuxt/tsconfig.server.json'],
        noWarnOnMultipleProjects: true
      }
    },
    'boundaries/include': ['layers/**'],
    'boundaries/elements': [
      { type: 'shared', pattern: 'layers/shared', mode: 'folder' },
      { type: 'feature', pattern: 'layers/*', mode: 'folder' }
    ]
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          { from: ['shared'], allow: ['shared'] },
          { from: ['feature'], allow: ['shared'] }
        ]
      }
    ],
    'boundaries/entry-point': [
      'error',
      {
        default: 'disallow',
        rules: [
          { target: ['shared', 'feature'], allow: ['app/index.ts', 'mock/index.ts'] }
        ]
      }
    ]
  }
})
