import { mountSuspended } from '@nuxt/test-utils/runtime'
import TermsPage from '../pages/termos.vue'

describe('termos.vue', () => {
  it('presents the catalog terms of use', async () => {
    const wrapper = await mountSuspended(TermsPage)

    expect(wrapper.find('h1').text()).toBe('Termos de uso')
    expect(wrapper.text()).toContain('Uso do catálogo')
    expect(wrapper.text()).toContain('Responsabilidade')
  })
})
