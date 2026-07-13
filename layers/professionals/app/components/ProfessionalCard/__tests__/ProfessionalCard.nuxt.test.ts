import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalCard from '../ProfessionalCard.vue'
import { buildProfessional } from '../../../../mock/fixtures'

const professional = buildProfessional()

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

  it('links to the professional detail route using an /{id}/{slug} path', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('/p-1/valentina')
  })

  it('shows the verified badge only when the professional is verified', async () => {
    const verified = await mountSuspended(ProfessionalCard, { props: { professional } })
    expect(verified.text()).toContain('✓')

    const unverified = await mountSuspended(ProfessionalCard, {
      props: { professional: { ...professional, verified: false } }
    })
    expect(unverified.text()).not.toContain('✓')
  })

  it('shows the online badge only when the professional is online', async () => {
    const online = await mountSuspended(ProfessionalCard, { props: { professional } })
    expect(online.text()).toContain('ONLINE')

    const offline = await mountSuspended(ProfessionalCard, {
      props: { professional: { ...professional, online: false } }
    })
    expect(offline.text()).not.toContain('ONLINE')
  })

  it('renders only the SSR image before carousel activation', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const galleryImages = wrapper.findAll('img[alt*="foto"]')

    expect(galleryImages).toHaveLength(1)
    expect(galleryImages[0]!.attributes('loading')).toBe('lazy')
    expect(galleryImages[0]!.attributes('src')).toBe(professional.gallery[0])
  })

  it('marks the first photo with high fetch priority only when the card is a priority card', async () => {
    const priority = await mountSuspended(ProfessionalCard, { props: { professional, priority: true } })
    expect(priority.find('img[alt*="foto"]').attributes('fetchpriority')).toBe('high')
    expect(priority.find('img[alt*="foto"]').attributes('loading')).toBe('eager')

    const regular = await mountSuspended(ProfessionalCard, { props: { professional } })
    expect(regular.find('img[alt*="foto"]').attributes('fetchpriority')).toBeUndefined()
  })
})
