import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfileTabs from '../ProfileTabs.vue'

describe('ProfessionalProfileProfileTabs', () => {
  it('renders all three section tabs', async () => {
    const wrapper = await mountSuspended(ProfileTabs, { props: { active: 'fotos', topOffset: 0 } })
    const text = wrapper.text()

    expect(text).toContain('Fotos e vídeos')
    expect(text).toContain('Sobre mim')
    expect(text).toContain('Avaliações')
  })

  it('emits select with the section id when a tab is clicked', async () => {
    const wrapper = await mountSuspended(ProfileTabs, { props: { active: 'fotos', topOffset: 0 } })
    const sobreButton = wrapper.findAll('button').find(b => b.text().includes('Sobre mim'))

    await sobreButton!.trigger('mousedown')

    expect(wrapper.emitted('select')).toEqual([['sobre']])
  })

  it('sticks below the given top offset once scrolled past', async () => {
    const wrapper = await mountSuspended(ProfileTabs, { props: { active: 'fotos', topOffset: 64 } })

    expect(wrapper.attributes('style')).toContain('top: 64px')
  })
})
