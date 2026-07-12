import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalPriceTag from '../ProfessionalPriceTag.vue'

describe('ProfessionalPriceTag', () => {
  it('renders the label and formatted price', async () => {
    const wrapper = await mountSuspended(ProfessionalPriceTag, {
      props: { price: 350 }
    })

    const text = wrapper.text()
    expect(text).toContain('A partir de')
    expect(text).toContain('R$ 350')
  })

  it('omits the per-hour suffix by default', async () => {
    const wrapper = await mountSuspended(ProfessionalPriceTag, {
      props: { price: 350 }
    })

    expect(wrapper.text()).not.toContain('/ hora')
  })

  it('shows the per-hour suffix when requested', async () => {
    const wrapper = await mountSuspended(ProfessionalPriceTag, {
      props: { price: 350, perHour: true }
    })

    expect(wrapper.text()).toContain('/ hora')
  })
})
