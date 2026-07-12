import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { buildCategoryItems, useHomeCategories } from '../useHomeCategories'
import type { Profession } from '../../../types'

const professions: Profession[] = [
  { label: 'Acompanhante', slug: 'acompanhante', icon: 'i-lucide-heart' },
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'DJ', slug: 'dj', icon: 'i-lucide-disc-3' }
]

const { professionsData, counts } = vi.hoisted(() => ({
  professionsData: {
    value: [
      { label: 'Acompanhante', slug: 'acompanhante', icon: 'i-lucide-heart' },
      { label: 'Massoterapeuta', slug: 'massoterapeuta', icon: 'i-lucide-hand' },
      { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
      { label: 'Dançarino', slug: 'dancarino', icon: 'i-lucide-music' }
    ]
  },
  counts: {
    acompanhante: { value: 29 },
    massoterapeuta: { value: undefined },
    modelo: { value: 12 },
    dancarino: { value: undefined }
  }
}))

mockNuxtImport('useProfessions', () => () => ({ data: professionsData }))
mockNuxtImport('useCategoryCounts', () => () => counts)

describe('buildCategoryItems', () => {
  it('builds one item per slug, in the requested order, merging in its count', () => {
    const categoryCounts = { modelo: 39, acompanhante: 29 }

    expect(buildCategoryItems(professions, categoryCounts, ['modelo', 'acompanhante'])).toEqual([
      { slug: 'modelo', label: 'Modelo', icon: 'i-lucide-camera', count: 39 },
      { slug: 'acompanhante', label: 'Acompanhante', icon: 'i-lucide-heart', count: 29 }
    ])
  })

  it('uses null when a count is not yet available', () => {
    expect(buildCategoryItems(professions, {}, ['modelo'])).toEqual([
      { slug: 'modelo', label: 'Modelo', icon: 'i-lucide-camera', count: null }
    ])
  })

  it('skips slugs with no matching profession', () => {
    expect(buildCategoryItems(professions, {}, ['acompanhante', 'does-not-exist'])).toEqual([
      { slug: 'acompanhante', label: 'Acompanhante', icon: 'i-lucide-heart', count: null }
    ])
  })

  it('returns an empty array when given no professions', () => {
    expect(buildCategoryItems([], {}, ['acompanhante'])).toEqual([])
  })
})

describe('useHomeCategories', () => {
  it('maps professions and counts into category items for the home slugs', () => {
    const { categories } = useHomeCategories()

    expect(categories.value).toEqual([
      { slug: 'acompanhante', label: 'Acompanhante', icon: 'i-lucide-heart', count: 29 },
      { slug: 'massoterapeuta', label: 'Massoterapeuta', icon: 'i-lucide-hand', count: null },
      { slug: 'modelo', label: 'Modelo', icon: 'i-lucide-camera', count: 12 },
      { slug: 'dancarino', label: 'Dançarino', icon: 'i-lucide-music', count: null }
    ])
  })
})
