import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalProfile from '../ProfessionalProfile.vue'
import type { Professional } from '../../../types'

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
  description: 'Atendimento premium e discreto no centro de São Paulo.',
  location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 },
  gallery: [
    'https://example.test/1.jpg',
    'https://example.test/2.jpg',
    'https://example.test/3.jpg',
    'https://example.test/4.jpg',
    'https://example.test/5.jpg',
    'https://example.test/6.jpg'
  ],
  services: [
    { name: 'Massagem', price: 200 },
    { name: '1 hora', price: 350 }
  ],
  availability: [],
  reviews: [
    { author: 'Anônimo', rating: 5, comment: 'Atendimento impecável.', date: '2026-01-10T00:00:00.000Z' }
  ]
}

describe('ProfessionalProfile', () => {
  it('renders name, verified badge, profession, rating and distance', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Valentina')
    expect(text).toContain('✓')
    expect(text).toContain('Modelo')
    expect(text).toContain('4.9')
    expect(text).toContain('2.3 km')
  })

  it('shows the online badge only when the professional is online', async () => {
    const online = await mountSuspended(ProfessionalProfile, { props: { professional } })
    expect(online.text()).toContain('ONLINE')

    const offline = await mountSuspended(ProfessionalProfile, {
      props: { professional: { ...professional, online: false } }
    })
    expect(offline.text()).not.toContain('ONLINE')
  })

  it('renders the description and each service with its price', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain(professional.description)
    expect(text).toContain('Massagem')
    expect(text).toContain('R$ 200')
    expect(text).toContain('1 hora')
    expect(text).toContain('R$ 350')
  })

  it('caps the gallery grid and shows an overlay with the remaining count', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })

    expect(wrapper.findAll('img[alt*="galeria"]')).toHaveLength(5)
    expect(wrapper.text()).toContain('+1')
  })

  it('renders each review with author, rating and comment', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Anônimo')
    expect(text).toContain('Atendimento impecável.')
  })

  it('shows the base price and a message CTA in the sticky bar', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('R$ 350')
    expect(text).toContain('Enviar mensagem')
  })

  it('links back to the catalog', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })

    expect(wrapper.findAll('a').map(a => a.attributes('href'))).toContain('/')
  })
})
