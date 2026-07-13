import { mountSuspended } from '@nuxt/test-utils/runtime'
import FilterPanel from '../FilterPanel.vue'
import type { FilterPanelProps } from '../types'
import type { Profession } from '../../../../types'

const professions: Profession[] = [
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'Massoterapeuta', slug: 'massoterapeuta', icon: 'i-lucide-hand' }
]

const baseProps: FilterPanelProps = { professions }

describe('FilterPanel', () => {
  it('renders the header and profession chips', async () => {
    const wrapper = await mountSuspended(FilterPanel, { props: baseProps })
    const text = wrapper.text()

    expect(text).toContain('Filtros')
    expect(text).toContain('Modelo')
    expect(text).toContain('Massoterapeuta')
  })

  it('emits update:profession when a chip is clicked', async () => {
    const wrapper = await mountSuspended(FilterPanel, { props: baseProps })
    const chip = wrapper.findAll('button').find(b => b.text() === 'Modelo')

    await chip!.trigger('click')

    expect(wrapper.emitted('update:profession')).toEqual([['modelo']])
  })

  it('toggles online from the current value', async () => {
    const wrapper = await mountSuspended(FilterPanel, {
      props: { ...baseProps, online: undefined }
    })
    const toggle = wrapper.findAll('button').find(b => b.text().includes('Somente online agora'))

    await toggle!.trigger('click')

    expect(wrapper.emitted('update:online')).toEqual([[true]])
  })

  it('emits update:minRating when a rating chip is clicked', async () => {
    const wrapper = await mountSuspended(FilterPanel, { props: baseProps })
    const chip = wrapper.findAll('button').find(b => b.text() === '4.5+')

    await chip!.trigger('click')

    expect(wrapper.emitted('update:minRating')).toEqual([[4.5]])
  })

  it('emits close when the header close button is clicked', async () => {
    const wrapper = await mountSuspended(FilterPanel, { props: baseProps })

    await wrapper.get('[aria-label="Fechar"]').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('scrolls to the matching section when clicked in the rail nav', async () => {
    const scrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoView

    const wrapper = await mountSuspended(FilterPanel, { props: baseProps })
    const ratingSection = wrapper.findAll('button').find(b => b.text() === 'Avaliação')

    await ratingSection!.trigger('mousedown')

    expect(scrollIntoView).toHaveBeenCalled()
  })
})
