import type { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SortPanel from '../SortPanel.vue'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountPanel() {
  activeWrapper = await mountSuspended(SortPanel, { attachTo: document.body })
  return activeWrapper
}

describe('SortPanel', () => {
  it('renders the header and sort options', async () => {
    const wrapper = await mountPanel()
    const text = wrapper.text()

    expect(text).toContain('Ordenar por')
    expect(text).toContain('Novidades')
    expect(text).toContain('Valor Online')
  })

  it('emits update:sort and close when an option is selected', async () => {
    const wrapper = await mountPanel()
    const option = wrapper.findAll('button').find((b: DOMWrapper<Element>) => b.text().includes('Novidades'))

    await option!.trigger('click')

    expect(wrapper.emitted('update:sort')).toEqual([['newest']])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when the header close button is clicked', async () => {
    const wrapper = await mountPanel()

    await wrapper.get('[aria-label="Fechar"]').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
