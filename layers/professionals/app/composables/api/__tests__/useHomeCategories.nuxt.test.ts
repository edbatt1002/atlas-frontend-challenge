import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useHomeCategories } from '../useHomeCategories'

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
