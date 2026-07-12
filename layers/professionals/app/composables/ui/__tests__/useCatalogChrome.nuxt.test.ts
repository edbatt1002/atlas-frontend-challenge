import { defineComponent, h, nextTick, ref } from 'vue'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { getScrollDirectionUp, shouldShowHeader } from '../useCatalogChrome'

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

describe('shouldShowHeader', () => {
  it('always shows near the top of the page, regardless of direction', () => {
    expect(shouldShowHeader(0, false, 80)).toBe(true)
    expect(shouldShowHeader(80, false, 80)).toBe(true)
  })

  it('hides past the threshold while scrolling down', () => {
    expect(shouldShowHeader(200, false, 80)).toBe(false)
  })

  it('shows past the threshold while scrolling up', () => {
    expect(shouldShowHeader(200, true, 80)).toBe(true)
  })
})

describe('getScrollDirectionUp', () => {
  it('detects a clear downward scroll as not-up', () => {
    expect(getScrollDirectionUp(150, 100, true, 10)).toBe(false)
  })

  it('detects a clear upward scroll as up', () => {
    expect(getScrollDirectionUp(100, 150, false, 10)).toBe(true)
  })

  it('ignores tiny deltas inside the dead zone, keeping the previous direction', () => {
    expect(getScrollDirectionUp(103, 100, true, 10)).toBe(true)
    expect(getScrollDirectionUp(97, 100, false, 10)).toBe(false)
  })

  it('flips direction once the delta exceeds the dead zone', () => {
    expect(getScrollDirectionUp(112, 100, true, 10)).toBe(false)
  })
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
