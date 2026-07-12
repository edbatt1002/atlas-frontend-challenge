import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const TestComponent = defineComponent({
  setup() {
    const columns = useCatalogGridColumns()
    return { columns }
  },
  render() {
    return h('div', String(this.columns))
  }
})

describe('useCatalogGridColumns', () => {
  it('returns a column count between 1 and 4', async () => {
    const wrapper = await mountSuspended(TestComponent)

    const columns = Number(wrapper.text())
    expect(columns).toBeGreaterThanOrEqual(1)
    expect(columns).toBeLessThanOrEqual(4)
  })
})
