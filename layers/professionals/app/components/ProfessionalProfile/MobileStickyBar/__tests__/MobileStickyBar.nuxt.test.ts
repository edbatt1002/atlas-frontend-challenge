import { mountSuspended } from '@nuxt/test-utils/runtime'
import MobileStickyBar from '../MobileStickyBar.vue'

describe('ProfessionalProfileMobileStickyBar', () => {
  it('shows the price and a WhatsApp deep link', async () => {
    const wrapper = await mountSuspended(MobileStickyBar, {
      props: { price: 350, contact: { whatsapp: '5511999998888' } }
    })

    expect(wrapper.text()).toContain('R$ 350')
    expect(wrapper.findAll('a').map(a => a.attributes('href'))).toContain('https://wa.me/5511999998888')
  })
})
