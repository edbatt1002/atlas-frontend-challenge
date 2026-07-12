import { mountSuspended } from '@nuxt/test-utils/runtime'
import BottomCta from '../BottomCta.vue'

describe('HomeBottomCta', () => {
  it('links to the catalog', async () => {
    const wrapper = await mountSuspended(BottomCta)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('/buscar')
  })
})
