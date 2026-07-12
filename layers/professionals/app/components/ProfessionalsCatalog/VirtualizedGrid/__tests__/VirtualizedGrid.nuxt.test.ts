import { mountSuspended } from '@nuxt/test-utils/runtime'
import VirtualizedGrid from '../VirtualizedGrid.vue'
import { buildProfessional } from '../../../../../mock/fixtures'

describe('VirtualizedGrid', () => {
  it('renders a card for the provided items', async () => {
    const items = [
      buildProfessional({ id: 'p-1', name: 'Ana' }),
      buildProfessional({ id: 'p-2', name: 'Bruno' })
    ]

    const wrapper = await mountSuspended(VirtualizedGrid, {
      props: { items, priorityCount: 4 }
    })

    expect(wrapper.text()).toContain('Ana')
    expect(wrapper.text()).toContain('Bruno')
  })

  it('drives every row grid with the same column count that chunks the items', async () => {
    const items = Array.from({ length: 8 }, (_, i) => buildProfessional({ id: `p-${i}`, name: `N${i}` }))

    const wrapper = await mountSuspended(VirtualizedGrid, {
      props: { items, priorityCount: 4 }
    })

    const rows = wrapper.findAll('[data-index]')
    for (const row of rows) {
      const style = row.attributes('style') ?? ''
      const cardsInRow = row.findAll('article').length
      const match = style.match(/repeat\((\d+),/)
      expect(match).not.toBeNull()
      expect(cardsInRow).toBeLessThanOrEqual(Number(match![1]))
    }
  })

  it('renders nothing when there are no items', async () => {
    const wrapper = await mountSuspended(VirtualizedGrid, {
      props: { items: [], priorityCount: 4 }
    })

    expect(wrapper.findAll('article')).toHaveLength(0)
  })
})
