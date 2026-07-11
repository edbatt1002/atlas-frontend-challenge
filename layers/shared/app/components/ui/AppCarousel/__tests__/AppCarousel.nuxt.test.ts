import { h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppCarousel from '../AppCarousel.vue'
import AppCarouselSlide from '../../AppCarouselSlide/AppCarouselSlide.vue'

describe('AppCarousel', () => {
  it('renders one swiper-slide per slide passed in the default slot', async () => {
    const wrapper = await mountSuspended(AppCarousel, {
      slots: {
        default: () => [
          h(AppCarouselSlide, null, () => 'Slide 1'),
          h(AppCarouselSlide, null, () => 'Slide 2'),
          h(AppCarouselSlide, null, () => 'Slide 3')
        ]
      }
    })

    expect(wrapper.findAll('swiper-slide')).toHaveLength(3)
    expect(wrapper.text()).toContain('Slide 1')
    expect(wrapper.text()).toContain('Slide 3')
  })
})
