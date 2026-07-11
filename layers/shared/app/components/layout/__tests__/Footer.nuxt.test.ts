import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '../Footer.vue'

describe('LayoutFooter', () => {
  it('is hidden below the lg breakpoint (mobile uses the bottom tab bar instead)', async () => {
    const wrapper = await mountSuspended(Footer)
    expect(wrapper.classes()).toContain('hidden')
    expect(wrapper.classes()).toContain('lg:block')
  })

  it('renders both logo variants', async () => {
    const wrapper = await mountSuspended(Footer)
    const logos = wrapper.findAll('img[alt="onluxe"]')
    expect(logos).toHaveLength(2)
  })

  it('renders the nav links without the mockup\'s age-gate link', async () => {
    const wrapper = await mountSuspended(Footer)
    const text = wrapper.text()
    expect(text).toContain('Termos')
    expect(text).toContain('Privacidade')
    expect(text).toContain('Suporte')
    expect(text).not.toContain('Verificação')
  })

  it('renders the copyright with the current year', async () => {
    const wrapper = await mountSuspended(Footer)
    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()} onluxe`)
  })
})
