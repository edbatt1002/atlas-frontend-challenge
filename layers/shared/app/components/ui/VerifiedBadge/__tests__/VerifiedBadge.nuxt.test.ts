import { mountSuspended } from '@nuxt/test-utils/runtime'
import VerifiedBadge from '../VerifiedBadge.vue'

describe('VerifiedBadge', () => {
  it('exposes an accessible name', async () => {
    const wrapper = await mountSuspended(VerifiedBadge)

    expect(wrapper.get('span').attributes('aria-label')).toBe('Perfil verificado')
  })

  it('defaults to the small size', async () => {
    const wrapper = await mountSuspended(VerifiedBadge)

    expect(wrapper.get('span').classes()).toContain('size-3.5')
  })

  it('applies the medium size when requested', async () => {
    const wrapper = await mountSuspended(VerifiedBadge, {
      props: { size: 'md' }
    })

    expect(wrapper.get('span').classes()).toContain('size-5')
  })
})
