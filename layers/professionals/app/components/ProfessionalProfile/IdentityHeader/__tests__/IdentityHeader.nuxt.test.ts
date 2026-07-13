import { mountSuspended } from '@nuxt/test-utils/runtime'
import IdentityHeader from '../IdentityHeader.vue'
import type { IdentityHeaderProps } from '../types'

const props: IdentityHeaderProps = {
  avatarUrl: 'https://example.test/avatar.jpg',
  name: 'Valentina',
  profession: 'Modelo',
  verified: true,
  online: true,
  rating: 4.9,
  reviewsCount: 214,
  location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 },
  contact: { whatsapp: '5511999999999' }
}

describe('ProfessionalProfileIdentityHeader', () => {
  it('renders name, profession, rating, reviews and location', async () => {
    const wrapper = await mountSuspended(IdentityHeader, { props })
    const text = wrapper.text()

    expect(text).toContain('Valentina')
    expect(text).toContain('Modelo')
    expect(text).toContain('4.9')
    expect(text).toContain('214')
    expect(text).toContain('São Paulo')
    expect(text).toContain('2.3 km')
  })

  it('shows the verified badge only when verified', async () => {
    const verified = await mountSuspended(IdentityHeader, { props })
    expect(verified.text()).toContain('✓')

    const unverified = await mountSuspended(IdentityHeader, { props: { ...props, verified: false } })
    expect(unverified.text()).not.toContain('✓')
  })

  it('shows the online badge only when online', async () => {
    const online = await mountSuspended(IdentityHeader, { props })
    expect(online.text()).toContain('ONLINE AGORA')

    const offline = await mountSuspended(IdentityHeader, { props: { ...props, online: false } })
    expect(offline.text()).not.toContain('ONLINE AGORA')
  })
})
