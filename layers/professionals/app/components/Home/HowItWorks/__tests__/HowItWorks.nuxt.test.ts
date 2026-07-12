import { mountSuspended } from '@nuxt/test-utils/runtime'
import HowItWorks from '../HowItWorks.vue'

describe('HomeHowItWorks', () => {
  it('renders all three steps', async () => {
    const wrapper = await mountSuspended(HowItWorks)
    const text = wrapper.text()

    expect(text).toContain('Busque')
    expect(text).toContain('Compare')
    expect(text).toContain('Converse')
  })
})
