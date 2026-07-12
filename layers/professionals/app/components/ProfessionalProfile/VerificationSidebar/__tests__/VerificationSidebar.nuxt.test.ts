import { mountSuspended } from '@nuxt/test-utils/runtime'
import VerificationSidebar from '../VerificationSidebar.vue'
import type { VerificationSidebarProps } from '../types'

const props: VerificationSidebarProps = {
  basePrice: 350,
  priceTiers: [{ label: '1 hora', price: 350 }],
  contact: { whatsapp: '5511999998888' },
  verified: true,
  stats: { lastActivity: 'Agora', responseTime: '~5 min', memberSince: '2024' }
}

describe('ProfessionalProfileVerificationSidebar', () => {
  it('renders the base price, tiers and stats', async () => {
    const wrapper = await mountSuspended(VerificationSidebar, { props })
    const text = wrapper.text()

    expect(text).toContain('R$ 350')
    expect(text).toContain('Agora')
    expect(text).toContain('~5 min')
    expect(text).toContain('2024')
  })

  it('shows the verified block only when verified', async () => {
    const verified = await mountSuspended(VerificationSidebar, { props })
    expect(verified.text()).toContain('Perfil verificado')

    const unverified = await mountSuspended(VerificationSidebar, { props: { ...props, verified: false } })
    expect(unverified.text()).not.toContain('Perfil verificado')
  })
})
