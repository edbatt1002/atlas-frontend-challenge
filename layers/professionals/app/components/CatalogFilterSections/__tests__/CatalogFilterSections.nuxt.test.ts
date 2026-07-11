import { mountSuspended } from '@nuxt/test-utils/runtime'
import CatalogFilterSections from '../CatalogFilterSections.vue'

const sections = [
  { id: 'profissao' as const, label: 'Profissão', count: 1 },
  { id: 'disponibilidade' as const, label: 'Status', count: 0 },
  { id: 'preco' as const, label: 'Preço', count: 0 },
  { id: 'avaliacao' as const, label: 'Avaliação', count: 0 }
]

describe('CatalogFilterSections', () => {
  it('renders all sections with their labels', async () => {
    const wrapper = await mountSuspended(CatalogFilterSections, { props: { sections, active: 'profissao' } })
    const text = wrapper.text()

    expect(text).toContain('Profissão')
    expect(text).toContain('Status')
    expect(text).toContain('Preço')
    expect(text).toContain('Avaliação')
  })

  it('shows the count badge only when greater than zero', async () => {
    const wrapper = await mountSuspended(CatalogFilterSections, { props: { sections, active: 'profissao' } })

    expect(wrapper.text()).toContain('1')
  })

  it('emits select with the clicked section id', async () => {
    const wrapper = await mountSuspended(CatalogFilterSections, { props: { sections, active: 'profissao' } })

    await wrapper.findAll('button')[2]!.trigger('click')

    expect(wrapper.emitted('select')).toEqual([['preco']])
  })
})
