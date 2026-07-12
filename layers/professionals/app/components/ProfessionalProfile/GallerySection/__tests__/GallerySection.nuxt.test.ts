import { mountSuspended } from '@nuxt/test-utils/runtime'
import GallerySection from '../GallerySection.vue'
import type { ProfessionalMedia } from '../../../../types'

function media(count: number, videoIndexes: number[] = []): ProfessionalMedia[] {
  return Array.from({ length: count }, (_, i) => ({
    url: `${i}.jpg`,
    type: videoIndexes.includes(i) ? 'video' as const : 'photo' as const
  }))
}

describe('ProfessionalProfileGallerySection', () => {
  it('renders nothing when there is no media', async () => {
    const wrapper = await mountSuspended(GallerySection, { props: { media: [], name: 'Valentina' } })

    expect(wrapper.text()).not.toContain('Galeria')
  })

  it('shows the total media count in the heading', async () => {
    const wrapper = await mountSuspended(GallerySection, { props: { media: media(3), name: 'Valentina' } })

    expect(wrapper.text()).toContain('Galeria · 3 mídias')
  })

  it('marks video items with a play indicator', async () => {
    const wrapper = await mountSuspended(GallerySection, { props: { media: media(3, [1]), name: 'Valentina' } })

    expect(wrapper.text()).toContain('▶')
  })

  it('caps the grid and shows the remaining count on the last tile', async () => {
    const wrapper = await mountSuspended(GallerySection, { props: { media: media(7), name: 'Valentina' } })

    expect(wrapper.findAll('img')).toHaveLength(5)
    expect(wrapper.text()).toContain('+2')
  })
})
