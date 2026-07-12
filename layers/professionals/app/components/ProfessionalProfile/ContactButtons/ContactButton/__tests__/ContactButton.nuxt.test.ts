import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactButton from '../ContactButton.vue'

describe('ProfessionalProfileContactButtonsContactButton', () => {
  it('renders a telegram deep link with the network label', async () => {
    const wrapper = await mountSuspended(ContactButton, { props: { network: 'telegram', value: 'tg_handle' } })

    expect(wrapper.find('a').attributes('href')).toBe('https://t.me/tg_handle')
    expect(wrapper.text()).toContain('Telegram')
  })

  it('renders a whatsapp deep link with the network label', async () => {
    const wrapper = await mountSuspended(ContactButton, { props: { network: 'whatsapp', value: '5511999998888' } })

    expect(wrapper.find('a').attributes('href')).toBe('https://wa.me/5511999998888')
    expect(wrapper.text()).toContain('WhatsApp')
  })

  it('allows overriding the label', async () => {
    const wrapper = await mountSuspended(ContactButton, {
      props: { network: 'whatsapp', value: '5511999998888', label: 'Chamar no WhatsApp' }
    })

    expect(wrapper.text()).toContain('Chamar no WhatsApp')
  })
})
