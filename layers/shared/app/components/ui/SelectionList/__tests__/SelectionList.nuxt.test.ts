import { mountSuspended } from '@nuxt/test-utils/runtime'
import SelectionList from '../SelectionList.vue'

const ITEMS = [
  { label: 'Destaques', value: 'featured' },
  { label: 'Novidades', value: 'newest' }
]

describe('UiSelectionList', () => {
  it('renders every item label', async () => {
    const wrapper = await mountSuspended(SelectionList, { props: { items: ITEMS } })

    expect(wrapper.text()).toContain('Destaques')
    expect(wrapper.text()).toContain('Novidades')
  })

  it('emits update:modelValue with the clicked item value', async () => {
    const wrapper = await mountSuspended(SelectionList, { props: { items: ITEMS } })

    const option = wrapper.findAll('button').find(b => b.text().includes('Novidades'))
    await option!.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['newest']])
  })

  it('marks the selected item with a check icon', async () => {
    const wrapper = await mountSuspended(SelectionList, { props: { items: ITEMS, modelValue: 'featured' } })

    const selected = wrapper.findAll('button').find(b => b.text().includes('Destaques'))
    const unselected = wrapper.findAll('button').find(b => b.text().includes('Novidades'))

    expect(selected!.find('[data-slot="trailingIcon"]').exists()).toBe(true)
    expect(unselected!.find('[data-slot="trailingIcon"]').exists()).toBe(false)
  })
})
