import { h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Carousel from '../Carousel.vue'
import CarouselSlide from '../../CarouselSlide/CarouselSlide.vue'

describe('Carousel', () => {
  it('renders one swiper-slide per slide passed in the default slot', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { slideCount: 3 },
      slots: {
        default: () => [
          h(CarouselSlide, null, () => 'Slide 1'),
          h(CarouselSlide, null, () => 'Slide 2'),
          h(CarouselSlide, null, () => 'Slide 3')
        ]
      }
    })

    expect(wrapper.findAll('swiper-slide')).toHaveLength(3)
    expect(wrapper.text()).toContain('Slide 1')
    expect(wrapper.text()).toContain('Slide 3')
  })

  it('does not render navigation buttons when navigation is off', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { slideCount: 3 },
      slots: { default: () => h(CarouselSlide, null, () => 'Slide 1') }
    })

    expect(wrapper.find('[aria-label="Slide anterior"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="Próximo slide"]').exists()).toBe(false)
  })

  it('hides the prev button on the first slide and the next button on the last slide', async () => {
    const first = await mountSuspended(Carousel, {
      props: { slideCount: 3, navigation: true, modelValue: 0 },
      slots: { default: () => h(CarouselSlide, null, () => 'Slide 1') }
    })
    expect(first.find('[aria-label="Slide anterior"]').exists()).toBe(false)
    expect(first.find('[aria-label="Próximo slide"]').exists()).toBe(true)

    const last = await mountSuspended(Carousel, {
      props: { slideCount: 3, navigation: true, modelValue: 2 },
      slots: { default: () => h(CarouselSlide, null, () => 'Slide 1') }
    })
    expect(last.find('[aria-label="Slide anterior"]').exists()).toBe(true)
    expect(last.find('[aria-label="Próximo slide"]').exists()).toBe(false)
  })

  it('emits update:modelValue when the next button is activated', async () => {
    const wrapper = await mountSuspended(Carousel, {
      props: { slideCount: 3, navigation: true, modelValue: 0 },
      slots: { default: () => h(CarouselSlide, null, () => 'Slide 1') }
    })

    await wrapper.find('[aria-label="Próximo slide"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
  })
})
