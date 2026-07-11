import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalCard from '../ProfessionalCard.vue'
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
  description: 'Perfil de teste',
  location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 },
  gallery: [],
  services: [],
  availability: [],
  reviews: []
}

describe('ProfessionalCard', () => {
  it('renders name, profession, price, rating and location', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Valentina')
    expect(text).toContain('Modelo')
    expect(text).toContain('R$ 350')
    expect(text).toContain('4.9')
    expect(text).toContain('São Paulo')
    expect(text).toContain('2.3 km')
  })

  it('links to the professional detail route', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })

    expect(wrapper.find('a').attributes('href')).toBe('/professionals/p-1')
  })

  it('shows the online badge only when the professional is online', async () => {
    const online = await mountSuspended(ProfessionalCard, { props: { professional } })
    expect(online.text()).toContain('ONLINE')

    const offline = await mountSuspended(ProfessionalCard, {
      props: { professional: { ...professional, online: false } }
    })
    expect(offline.text()).not.toContain('ONLINE')
  })

  it('lazy-loads the photo', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const img = wrapper.find('img')

    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('src')).toBe(professional.photo)
  })
})
