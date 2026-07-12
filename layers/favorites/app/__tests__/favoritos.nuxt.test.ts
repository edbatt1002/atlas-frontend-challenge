import { mountSuspended } from '@nuxt/test-utils/runtime'
import FavoritesPage from '../pages/favoritos.vue'

describe('favoritos.vue', () => {
  it('renders the initial empty favorites state', async () => {
    const wrapper = await mountSuspended(FavoritesPage)

    expect(wrapper.find('h1').text()).toBe('Favoritos')
    expect(wrapper.text()).toContain('Nenhum favorito por enquanto')
    expect(wrapper.find('a[href="/buscar"]').exists()).toBe(true)
  })
})
