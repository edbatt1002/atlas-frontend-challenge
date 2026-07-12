import { mountSuspended } from '@nuxt/test-utils/runtime'
import PrivacyPage from '../pages/privacidade.vue'

describe('privacidade.vue', () => {
  it('explains privacy for location and external platforms', async () => {
    const wrapper = await mountSuspended(PrivacyPage)

    expect(wrapper.find('h1').text()).toBe('Privacidade')
    expect(wrapper.text()).toContain('Localização')
    expect(wrapper.text()).toContain('WhatsApp ou Telegram')
  })
})
