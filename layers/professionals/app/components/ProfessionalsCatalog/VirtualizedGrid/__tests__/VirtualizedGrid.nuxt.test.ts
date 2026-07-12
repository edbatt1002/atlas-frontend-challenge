import { mountSuspended } from '@nuxt/test-utils/runtime'
import VirtualizedGrid from '../VirtualizedGrid.vue'
import { buildProfessional } from '../../../../../mock/fixtures'

describe('ProfessionalsCatalogVirtualizedGrid', () => {
  it('renders a card for items within the initial viewport window', async () => {
    const items = [
      buildProfessional({ id: 'p-1', name: 'Valentina' }),
      buildProfessional({ id: 'p-2', name: 'Isabela' })
    ]

    const wrapper = await mountSuspended(VirtualizedGrid, { props: { items, priorityCount: 4 } })

    expect(wrapper.text()).toContain('Valentina')
  })

  it('renders nothing when there are no items', async () => {
    const wrapper = await mountSuspended(VirtualizedGrid, { props: { items: [], priorityCount: 4 } })

    expect(wrapper.findAllComponents({ name: 'ProfessionalCard' })).toHaveLength(0)
  })
})
