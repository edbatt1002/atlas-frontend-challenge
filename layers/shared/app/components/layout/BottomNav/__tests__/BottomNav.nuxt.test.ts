import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BottomNav from '../BottomNav.vue'

describe('LayoutBottomNav', () => {
  it('is hidden from lg up (desktop uses the footer instead)', async () => {
    const wrapper = await mountSuspended(BottomNav)
    expect(wrapper.classes()).toContain('lg:hidden')
  })

  it('renders all four tabs', async () => {
    const wrapper = await mountSuspended(BottomNav)
    const text = wrapper.text()
    expect(text).toContain('Explorar')
    expect(text).toContain('Buscar')
    expect(text).toContain('Favoritos')
    expect(text).toContain('Chat')
  })

  it('links each tab to its route', async () => {
    const wrapper = await mountSuspended(BottomNav)
    const links = wrapper.findAll('a')
    expect(links.map(l => l.attributes('href'))).toEqual([
      '/',
      '/buscar',
      '/favoritos',
      '/chat'
    ])
  })

  it('highlights the tab matching the current route', async () => {
    const wrapper = await mountSuspended(BottomNav, {
      route: '/'
    })
    const activeLink = wrapper.findAll('a').find(l => l.text().includes('Explorar'))
    expect(activeLink!.classes()).toContain('text-primary')

    const inactiveLink = wrapper.findAll('a').find(l => l.text().includes('Buscar'))
    expect(inactiveLink!.classes()).toContain('text-muted')
  })
})
