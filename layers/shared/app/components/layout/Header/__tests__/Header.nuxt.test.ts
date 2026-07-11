import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Header from '../Header.vue'

describe('LayoutHeader', () => {
  it('renders both logo variants (light/dark swapped via CSS, both present in markup)', async () => {
    const wrapper = await mountSuspended(Header)
    const logos = wrapper.findAll('img[alt="onluxe"]')
    expect(logos).toHaveLength(2)
    expect(logos[0]!.attributes('src')).toBe('/onluxe-logo.svg')
    expect(logos[1]!.attributes('src')).toBe('/onluxe-logo-dark.svg')
  })

  it('renders the location indicator', async () => {
    const wrapper = await mountSuspended(Header)
    expect(wrapper.text()).toContain('São Paulo')
  })

  it('renders the color mode toggle', async () => {
    const wrapper = await mountSuspended(Header)
    expect(wrapper.findComponent({ name: 'UColorModeButton' }).exists()).toBe(true)
  })
})
