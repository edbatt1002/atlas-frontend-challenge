import { defineComponent, h, nextTick, ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const holder = vi.hoisted(() => ({
  y: { value: 0 } as { value: number },
  show: vi.fn(),
  hide: vi.fn()
}))

mockNuxtImport('useScroll', () => () => ({ y: holder.y }))
mockNuxtImport('useHeaderVisibility', () => () => ({ show: holder.show, hide: holder.hide }))

const Host = defineComponent({
  setup() {
    useCatalogChrome()
    return () => h('div')
  }
})

describe('useCatalogChrome', () => {
  beforeEach(() => {
    holder.y = ref(0)
    holder.show.mockClear()
    holder.hide.mockClear()
  })

  it('hides the header when scrolling down past the threshold', async () => {
    const wrapper = await mountSuspended(Host)

    holder.y.value = 200
    await nextTick()

    expect(holder.hide).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('shows the header again when scrolling back up', async () => {
    const wrapper = await mountSuspended(Host)

    holder.y.value = 300
    await nextTick()
    holder.y.value = 250
    await nextTick()

    expect(holder.show).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('restores the header on unmount', async () => {
    const wrapper = await mountSuspended(Host)
    holder.show.mockClear()

    wrapper.unmount()

    expect(holder.show).toHaveBeenCalled()
  })
})
