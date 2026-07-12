import { mountSuspended } from '@nuxt/test-utils/runtime'
import Hero from '../Hero.vue'

describe('HomeHero', () => {
  it('renders the headline', async () => {
    const wrapper = await mountSuspended(Hero, { props: { totalLabel: null } })

    expect(wrapper.text()).toContain('Encontre quem combina com você')
  })

  it('shows the total badge only when a label is provided', async () => {
    const withTotal = await mountSuspended(Hero, { props: { totalLabel: '+600 profissionais verificados' } })
    expect(withTotal.text()).toContain('+600 profissionais verificados')

    const withoutTotal = await mountSuspended(Hero, { props: { totalLabel: null } })
    expect(withoutTotal.text()).not.toContain('profissionais verificados')
  })
})
