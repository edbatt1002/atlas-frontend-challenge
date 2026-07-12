import { defineComponent, h } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UApp from '@nuxt/ui/components/App.vue'
import RegionSearch from '../RegionSearch.vue'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(async () => {
  await nextTick()
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountRegionSearch() {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(RegionSearch)
      })
    }
  })
  activeWrapper = await mountSuspended(Host, { attachTo: document.body })
  return { body: new DOMWrapper(document.body) }
}

describe('HomeRegionSearch', () => {
  it('defaults to showing the whole country', async () => {
    const { body } = await mountRegionSearch()

    expect(body.text()).toContain('Todo o Brasil')
  })

  it('opens the state drawer on click and lets the user pick one', async () => {
    const { body } = await mountRegionSearch()

    await body.find('button').trigger('click')
    expect(body.text()).toContain('São Paulo · SP')

    const spOption = body.findAll('button').find(b => b.text().includes('São Paulo · SP'))
    await spOption!.trigger('click')

    expect(body.text()).toContain('São Paulo · SP')
  })

  it('points the explore CTA at the catalog filtered by the picked state', async () => {
    const { body } = await mountRegionSearch()
    const exploreLink = () => body.findAll('a').find(a => a.text().includes('Explorar profissionais'))

    expect(exploreLink()!.attributes('href')).toBe('/buscar')

    await body.find('button').trigger('click')
    const spOption = body.findAll('button').find(b => b.text().includes('São Paulo · SP'))
    await spOption!.trigger('click')

    expect(exploreLink()!.attributes('href')).toBe('/buscar?state=SP')
  })

  it('filters the state list as the user types', async () => {
    const { body } = await mountRegionSearch()
    await body.find('button').trigger('click')

    await body.find('input').setValue('rio')

    expect(body.text()).toContain('Rio de Janeiro')
    expect(body.text()).not.toContain('Minas Gerais')
  })

  it('closes the drawer when the close button is clicked, without picking a region', async () => {
    const { body } = await mountRegionSearch()
    await body.find('button').trigger('click')

    await body.find('[aria-label="Fechar"]').trigger('click')

    expect(body.text()).toContain('Todo o Brasil')
  })

  it('renders the popular shortcuts linking into the catalog', async () => {
    const { body } = await mountRegionSearch()
    const hrefs = body.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('/buscar?online=true')
  })
})
