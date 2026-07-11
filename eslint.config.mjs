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
      { type: 'shared', pattern: 'layers/shared' },
      { type: 'feature', pattern: 'layers/*' }
    ]
  },
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        policies: [
          { from: { element: { types: 'shared' } }, allow: { to: { element: { types: 'shared' } } } },
          { from: { element: { types: 'feature' } }, allow: { to: { element: { types: 'shared' } } } }
        ]
      }
    ]
  }
})
