import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const TestComponent = defineComponent({
  setup() {
    return useBottomNavVisibility()
  },
  render() {
    return h('div', String(this.visible))
  }
})

describe('useBottomNavVisibility', () => {
  it('defaults to visible', async () => {
    const wrapper = await mountSuspended(TestComponent)

    expect(wrapper.vm.visible).toBe(true)
  })

  it('hide() sets visible to false', async () => {
    const wrapper = await mountSuspended(TestComponent)

    wrapper.vm.hide()
    await nextTick()

    expect(wrapper.vm.visible).toBe(false)
  })

  it('show() sets visible back to true after hide()', async () => {
    const wrapper = await mountSuspended(TestComponent)

    wrapper.vm.hide()
    await nextTick()
    wrapper.vm.show()
    await nextTick()

    expect(wrapper.vm.visible).toBe(true)
  })
})
