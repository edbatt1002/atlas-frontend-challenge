import { mountSuspended } from '@nuxt/test-utils/runtime'
import FiltersPanel from '../FiltersPanel.vue'
import type { Profession } from '../../../types'

const professions: Profession[] = [
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'Massoterapeuta', slug: 'massoterapeuta', icon: 'i-lucide-hand' }
]

describe('FiltersPanel', () => {
  it('renders the search field', async () => {
    const wrapper = await mountSuspended(FiltersPanel, { props: { professions } })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.html()).toContain('Buscar por nome ou profissão')
  })

  it('emits clear when the Limpar button is clicked', async () => {
    const wrapper = await mountSuspended(FiltersPanel, { props: { professions } })
    const clearButton = wrapper.findAll('button').find(b => b.text().includes('Limpar'))

    await clearButton!.trigger('click')

    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
})
