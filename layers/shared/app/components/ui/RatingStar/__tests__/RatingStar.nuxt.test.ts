import { mountSuspended } from '@nuxt/test-utils/runtime'
import RatingStar from '../RatingStar.vue'

describe('RatingStar', () => {
  it('renders the value fixed to one decimal', async () => {
    const wrapper = await mountSuspended(RatingStar, {
      props: { value: 4.9 }
    })

    expect(wrapper.text()).toContain('★')
    expect(wrapper.text()).toContain('4.9')
  })

  it('pads whole numbers to one decimal', async () => {
    const wrapper = await mountSuspended(RatingStar, {
      props: { value: 5 }
    })

    expect(wrapper.text()).toContain('5.0')
  })

  it('renders default slot as a suffix', async () => {
    const wrapper = await mountSuspended(RatingStar, {
      props: { value: 4.2 },
      slots: { default: () => '· 214 avaliações' }
    })

    expect(wrapper.text()).toContain('· 214 avaliações')
  })
})
