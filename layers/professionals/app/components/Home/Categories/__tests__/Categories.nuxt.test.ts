import { mountSuspended } from '@nuxt/test-utils/runtime'
import Categories from '../Categories.vue'
import type { CategoryItem } from '../types'

const categories: CategoryItem[] = [
  { slug: 'acompanhante', label: 'Acompanhante', icon: 'i-lucide-heart', count: 29 },
  { slug: 'massoterapeuta', label: 'Massoterapeuta', icon: 'i-lucide-hand', count: 42 }
]

describe('HomeCategories', () => {
  it('renders a card per category with its label and count', async () => {
    const wrapper = await mountSuspended(Categories, { props: { categories } })
    const text = wrapper.text()

    expect(text).toContain('Acompanhante')
    expect(text).toContain('Massoterapeuta')
    expect(text).toContain('42 perfis')
  })

  it('shows a dash when the count is not yet available', async () => {
    const wrapper = await mountSuspended(Categories, {
      props: { categories: [{ slug: 'modelo', label: 'Modelo', icon: 'i-lucide-camera', count: null }] }
    })

    expect(wrapper.text()).toContain('— perfis')
  })

  it('links each category into the catalog filtered by profession', async () => {
    const wrapper = await mountSuspended(Categories, { props: { categories } })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('/buscar?profession=acompanhante')
  })
})
