import { mountSuspended } from '@nuxt/test-utils/runtime'
import Cover from '../Cover.vue'

describe('ProfessionalProfileCover', () => {
  it('renders the cover image and a link back to the catalog', async () => {
    const wrapper = await mountSuspended(Cover, {
      props: { coverUrl: 'https://example.test/cover.jpg', name: 'Valentina' }
    })

    expect(wrapper.find('img').attributes('src')).toBe('https://example.test/cover.jpg')
    expect(wrapper.findAll('a').map(a => a.attributes('href'))).toContain('/buscar')
  })
})
