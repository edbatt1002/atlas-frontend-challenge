import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import Categories from '../Categories.vue'
import type { Profession } from '../../../../types'

const professions: Profession[] = [
  { label: 'Acompanhante', slug: 'acompanhante', icon: 'i-lucide-heart' },
  { label: 'Massoterapeuta', slug: 'massoterapeuta', icon: 'i-lucide-hand' },
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'Dançarino(a)', slug: 'dancarino', icon: 'i-lucide-music' }
]

mockNuxtImport('useProfessions', () => () => ({
  data: ref(professions),
  isPending: ref(false),
  error: ref(null),
  refetch: vi.fn()
}))

mockNuxtImport('useCategoryCounts', () => (slugs: string[]) =>
  Object.fromEntries(slugs.map(slug => [slug, ref(42)])))

describe('HomeCategories', () => {
  it('renders a card per highlighted category with its label and count', async () => {
    const wrapper = await mountSuspended(Categories)
    const text = wrapper.text()

    expect(text).toContain('Acompanhante')
    expect(text).toContain('Massoterapeuta')
    expect(text).toContain('42 perfis')
  })

  it('links each category into the catalog filtered by profession', async () => {
    const wrapper = await mountSuspended(Categories)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('/buscar?profession=acompanhante')
  })
})
