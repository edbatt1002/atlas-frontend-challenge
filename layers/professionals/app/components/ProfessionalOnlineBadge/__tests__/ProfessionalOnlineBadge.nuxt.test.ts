import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalOnlineBadge from '../ProfessionalOnlineBadge.vue'

describe('ProfessionalOnlineBadge', () => {
  it('renders the label', async () => {
    const wrapper = await mountSuspended(ProfessionalOnlineBadge, {
      props: { variant: 'pill', label: 'ONLINE AGORA' }
    })

    expect(wrapper.text()).toContain('ONLINE AGORA')
  })

  it('applies the overlay variant classes', async () => {
    const wrapper = await mountSuspended(ProfessionalOnlineBadge, {
      props: { variant: 'overlay', label: 'ONLINE' }
    })

    expect(wrapper.get('span').classes()).toContain('bg-black/70')
  })

  it('applies the pill variant classes', async () => {
    const wrapper = await mountSuspended(ProfessionalOnlineBadge, {
      props: { variant: 'pill', label: 'ONLINE' }
    })

    expect(wrapper.get('span').classes()).toContain('bg-online/10')
  })
})
