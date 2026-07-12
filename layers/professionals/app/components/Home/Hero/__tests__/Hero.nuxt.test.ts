import { mountSuspended } from '@nuxt/test-utils/runtime'
import Hero from '../Hero.vue'

describe('HomeHero', () => {
  it('renders the headline', async () => {
    const wrapper = await mountSuspended(Hero, { props: { totalLabel: null } })

    expect(wrapper.text()).toContain('Encontre quem combina com você')
  })

  it('reserves the badge space while the total is loading', async () => {
    const withTotal = await mountSuspended(Hero, { props: { totalLabel: '+600 profissionais verificados' } })
    expect(withTotal.text()).toContain('+600 profissionais verificados')

    const withoutTotal = await mountSuspended(Hero, { props: { totalLabel: null } })
    expect(withoutTotal.find('span').classes()).toContain('invisible')
  })
})
