import { buildCategoryItems } from '../useHomeCategories'
import type { Profession } from '../../../types'

const professions: Profession[] = [
  { label: 'Acompanhante', slug: 'acompanhante', icon: 'i-lucide-heart' },
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'DJ', slug: 'dj', icon: 'i-lucide-disc-3' }
]

describe('buildCategoryItems', () => {
  it('builds one item per slug, in the requested order, merging in its count', () => {
    const counts = { modelo: 39, acompanhante: 29 }

    expect(buildCategoryItems(professions, counts, ['modelo', 'acompanhante'])).toEqual([
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
