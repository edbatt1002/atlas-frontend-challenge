import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactButtons from '../ContactButtons.vue'

describe('ProfessionalProfileContactButtons', () => {
  it('compact variant renders a button per available contact method', async () => {
    const wrapper = await mountSuspended(ContactButtons, {
      props: { contact: { telegram: 'tg_handle', whatsapp: '5511999998888' }, variant: 'compact' }
    })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('https://t.me/tg_handle')
    expect(hrefs).toContain('https://wa.me/5511999998888')
  })

  it('compact variant omits the button for a missing contact method', async () => {
    const wrapper = await mountSuspended(ContactButtons, {
      props: { contact: { whatsapp: '5511999998888' }, variant: 'compact' }
    })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('https://wa.me/5511999998888')
    expect(hrefs.some(h => h?.includes('t.me'))).toBe(false)
  })

  it('primary variant prefers whatsapp over telegram', async () => {
    const wrapper = await mountSuspended(ContactButtons, {
      props: { contact: { telegram: 'tg_handle', whatsapp: '5511999998888' }, variant: 'primary' }
    })

    expect(wrapper.text()).toContain('Chamar no WhatsApp')
  })

  it('primary variant falls back to telegram when whatsapp is missing', async () => {
    const wrapper = await mountSuspended(ContactButtons, {
      props: { contact: { telegram: 'tg_handle' }, variant: 'primary' }
    })

    expect(wrapper.text()).toContain('Chamar no Telegram')
  })

  it('renders nothing when there is no contact method at all', async () => {
    const wrapper = await mountSuspended(ContactButtons, {
      props: { contact: {}, variant: 'primary' }
    })

    expect(wrapper.findAll('a')).toHaveLength(0)
  })
})
