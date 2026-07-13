import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useProfileScrollSpy } from '../useProfileScrollSpy'

const SECTION_IDS = ['fotos', 'sobre', 'aval'] as const

function createHost() {
  return defineComponent({
    setup() {
      const spy = useProfileScrollSpy([...SECTION_IDS], '-100px 0px -50% 0px')
      return () => h('div', [
        h('span', spy.activeSection.value),
        h('div', { ref: spy.setSectionRef('fotos') }),
        h('div', { ref: spy.setSectionRef('sobre') }),
        h('div', { ref: spy.setSectionRef('aval') }),
        h('button', { onClick: () => spy.scrollToSection('aval') }, 'go-aval')
      ])
    }
  })
}

describe('useProfileScrollSpy', () => {
  it('starts active on the first section', async () => {
    const wrapper = await mountSuspended(createHost())

    expect(wrapper.find('span').text()).toBe('fotos')
  })

  it('scrolls to the target section when clicked', async () => {
    const scrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoView

    const wrapper = await mountSuspended(createHost())
    await wrapper.get('button').trigger('click')

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })

  it('forces the last section active when the user reaches the bottom of a scrollable page', async () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 4000, configurable: true })
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 3300, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    const wrapper = await mountSuspended(createHost())
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(wrapper.find('span').text()).toBe('aval')
  })
})
