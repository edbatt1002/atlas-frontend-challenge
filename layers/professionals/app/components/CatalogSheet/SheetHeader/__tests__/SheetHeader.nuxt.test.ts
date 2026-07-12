import { mountSuspended } from '@nuxt/test-utils/runtime'
import SheetHeader from '../SheetHeader.vue'

describe('SheetHeader', () => {
  it('renders the title', async () => {
    const wrapper = await mountSuspended(SheetHeader, {
      props: { title: 'Filtros' }
    })

    expect(wrapper.text()).toContain('Filtros')
  })

  it('emits close when the close button is clicked', async () => {
    const wrapper = await mountSuspended(SheetHeader, {
      props: { title: 'Filtros' }
    })

    await wrapper.get('[aria-label="Fechar"]').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
