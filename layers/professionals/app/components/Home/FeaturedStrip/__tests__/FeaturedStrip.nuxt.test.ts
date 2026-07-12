import { mountSuspended } from '@nuxt/test-utils/runtime'
import FeaturedStrip from '../FeaturedStrip.vue'
import { buildProfessional } from '../../../../../mock/fixtures'

const professional = buildProfessional()

describe('HomeFeaturedStrip', () => {
  it('renders a card per featured professional', async () => {
    const wrapper = await mountSuspended(FeaturedStrip, { props: { professionals: [professional] } })

    expect(wrapper.text()).toContain('Valentina')
  })

  it('reserves the strip space while featured professionals are loading', async () => {
    const wrapper = await mountSuspended(FeaturedStrip, { props: { professionals: [] } })

    expect(wrapper.text()).toContain('Em destaque hoje')
    expect(wrapper.findAllComponents({ name: 'ProfessionalCardSkeleton' })).toHaveLength(4)
  })
})
