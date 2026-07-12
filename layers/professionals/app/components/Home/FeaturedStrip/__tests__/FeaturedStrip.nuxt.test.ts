import { mountSuspended } from '@nuxt/test-utils/runtime'
import FeaturedStrip from '../FeaturedStrip.vue'
import type { Professional } from '../../../../types'

const professional: Professional = {
  id: 'p-1',
  name: 'Valentina',
  profession: 'Modelo',
  professionSlug: 'modelo',
  photo: 'https://example.test/valentina.jpg',
  price: 350,
  rating: 4.9,
  reviewsCount: 214,
  online: true,
  verified: true,
  photos: 24,
  videos: 3,
  createdAt: '2026-01-01T00:00:00.000Z',
  description: 'Perfil de teste',
  location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 },
  gallery: ['https://example.test/1.jpg'],
  services: [],
  availability: [],
  reviews: []
}

describe('HomeFeaturedStrip', () => {
  it('renders a card per featured professional', async () => {
    const wrapper = await mountSuspended(FeaturedStrip, { props: { professionals: [professional] } })

    expect(wrapper.text()).toContain('Valentina')
  })

  it('renders nothing when there are no featured professionals', async () => {
    const wrapper = await mountSuspended(FeaturedStrip, { props: { professionals: [] } })

    expect(wrapper.text()).not.toContain('Em destaque hoje')
  })
})
