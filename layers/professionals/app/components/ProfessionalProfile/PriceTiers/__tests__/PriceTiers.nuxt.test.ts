import { mountSuspended } from '@nuxt/test-utils/runtime'
import PriceTiers from '../PriceTiers.vue'

describe('ProfessionalProfilePriceTiers', () => {
  it('renders each tier with its formatted price', async () => {
    const wrapper = await mountSuspended(PriceTiers, {
      props: {
        tiers: [
          { label: '1 hora', price: 350 },
          { label: 'Pernoite', price: 1200 }
        ]
      }
    })
    const text = wrapper.text()

    expect(text).toContain('1 hora')
    expect(text).toContain('R$ 350')
    expect(text).toContain('Pernoite')
    expect(text).toContain('R$ 1.200')
  })
})
