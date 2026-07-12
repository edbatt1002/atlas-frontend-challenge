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

  it('caps the carousel to at most 4 photos from the gallery', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })

    expect(wrapper.findAll('swiper-slide')).toHaveLength(5)
  })

  it('renders every gallery photo, eager only for the first and native lazy for the rest', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const galleryImages = wrapper.findAll('img[alt*="foto"]')

    expect(galleryImages).toHaveLength(Math.min(professional.gallery.length, 4))
    expect(galleryImages[0]!.attributes('loading')).toBe('eager')
    expect(galleryImages[0]!.attributes('src')).toBe(professional.gallery[0])
    expect(galleryImages[1]!.attributes('loading')).toBe('lazy')
  })

  it('hands the neighbor-preload amount to the carousel via lazy-preload-prev-next', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })

    expect(wrapper.find('swiper-container').attributes('lazy-preload-prev-next')).toBe('1')
  })

  it('marks the first photo with high fetch priority only when the card is a priority card', async () => {
    const priority = await mountSuspended(ProfessionalCard, { props: { professional, priority: true } })
    expect(priority.find('img[alt*="foto"]').attributes('fetchpriority')).toBe('high')

    const regular = await mountSuspended(ProfessionalCard, { props: { professional } })
    expect(regular.find('img[alt*="foto"]').attributes('fetchpriority')).toBeUndefined()
  })

  it('renders the profile CTA slide with a blurred preview of the first photo, and the photo/video counts', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Entrar no perfil')
    expect(text).toContain('24')
    expect(text).toContain('3')
    expect(wrapper.find('img[aria-hidden="true"]').attributes('src')).toBe(professional.gallery[0])
  })
})
