import { mountSuspended } from '@nuxt/test-utils/runtime'
import Avatar from '../Avatar.vue'

describe('Avatar', () => {
  it('renders the image with src and alt when a src is given', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: { src: 'https://example.test/a.jpg', alt: 'Valentina' }
    })

    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('https://example.test/a.jpg')
    expect(img.attributes('alt')).toBe('Valentina')
  })

  it('falls back to initials when there is no src', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: { alt: 'Maria Costa' }
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('MC')
  })

  it('shows the online dot only when online', async () => {
    const online = await mountSuspended(Avatar, {
      props: { alt: 'Ana', online: true }
    })
    expect(online.find('[aria-label="Online agora"]').exists()).toBe(true)

    const offline = await mountSuspended(Avatar, {
      props: { alt: 'Ana' }
    })
    expect(offline.find('[aria-label="Online agora"]').exists()).toBe(false)
  })

  it('applies the requested size classes', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: { alt: 'Ana', size: 'hero' }
    })

    expect(wrapper.html()).toContain('size-[100px]')
    expect(wrapper.html()).toContain('lg:size-[150px]')
  })
})
