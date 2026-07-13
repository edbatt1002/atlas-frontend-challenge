import { mountSuspended } from '@nuxt/test-utils/runtime'
import Carousel from '../Carousel.vue'
import { buildProfessional } from '../../../../../mock/fixtures'

const professional = buildProfessional()
const photos = professional.gallery.slice(0, 4)

describe('ProfessionalCardCarousel', () => {
  it('caps the rendered carousel to four photos and the profile CTA', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 1 }
    })

    expect(wrapper.findAll('.swiper-slide')).toHaveLength(5)
  })

  it('configures neighbor preloading', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 1 }
    })

    expect(wrapper.findComponent({ name: 'UiCarousel' }).props('lazyPreloadPrevNext')).toBe(1)
  })

  it('keeps visited images mounted when navigating back', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 0 }
    })

    expect(wrapper.findAll('img[alt*="foto"]')).toHaveLength(2)

    await wrapper.setProps({ modelValue: 2 })
    expect(wrapper.findAll('img[alt*="foto"]')).toHaveLength(4)

    await wrapper.setProps({ modelValue: 0 })
    expect(wrapper.findAll('img[alt*="foto"]')).toHaveLength(4)
  })

  it('preserves eager loading for the LCP image of a priority card', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 0, priority: true }
    })
    const firstImage = wrapper.find('img[alt*="foto 1"]')

    expect(firstImage.attributes('loading')).toBe('eager')
    expect(firstImage.attributes('fetchpriority')).toBe('high')
  })

  it('signals readiness after the first image finishes loading', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 0 }
    })

    await wrapper.find('img[alt*="foto 1"]').trigger('load')

    expect(wrapper.emitted('ready')).toHaveLength(1)
  })

  it('renders the profile CTA with media counts', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { professional, photos, modelValue: 1 }
    })

    expect(wrapper.text()).toContain('Entrar no perfil')
    expect(wrapper.text()).toContain('24')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.find('img[aria-hidden="true"]').attributes('src')).toBe(professional.gallery[0])
  })
})
