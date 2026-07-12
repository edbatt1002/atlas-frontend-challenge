import { mountSuspended } from '@nuxt/test-utils/runtime'
import SupportPage from '../pages/suporte.vue'

describe('suporte.vue', () => {
  it('guides users to the available external contact channels', async () => {
    const wrapper = await mountSuspended(SupportPage)

    expect(wrapper.find('h1').text()).toBe('Como podemos ajudar?')
    expect(wrapper.text()).toContain('WhatsApp ou Telegram')
    expect(wrapper.find('a[href="/buscar"]').exists()).toBe(true)
  })
})
