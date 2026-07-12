import { mountSuspended } from '@nuxt/test-utils/runtime'
import ReviewsList from '../ReviewsList.vue'

describe('ProfessionalProfileReviewsList', () => {
  it('renders nothing when there are no reviews', async () => {
    const wrapper = await mountSuspended(ReviewsList, { props: { reviews: [] } })

    expect(wrapper.text()).not.toContain('Avaliações')
  })

  it('renders each review with author, rating and comment', async () => {
    const wrapper = await mountSuspended(ReviewsList, {
      props: {
        reviews: [
          { author: 'Anônimo', rating: 5, comment: 'Atendimento impecável.', date: '2026-01-10T00:00:00.000Z' }
        ]
      }
    })
    const text = wrapper.text()

    expect(text).toContain('Anônimo')
    expect(text).toContain('5.0')
    expect(text).toContain('Atendimento impecável.')
  })
})
