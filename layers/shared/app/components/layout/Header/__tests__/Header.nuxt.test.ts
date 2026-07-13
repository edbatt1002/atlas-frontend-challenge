import { defineComponent, h } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { pt_br } from '@nuxt/ui/locale'
import UApp from '@nuxt/ui/components/App.vue'
import Header from '../Header.vue'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountHeader() {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, { locale: pt_br }, {
        default: () => h(Header)
      })
    }
  })

  activeWrapper = await mountSuspended(Host, { attachTo: document.body })
  return {
    wrapper: activeWrapper,
    body: new DOMWrapper(document.body)
  }
}

describe('LayoutHeader', () => {
  it('renders both logo variants (light/dark swapped via CSS, both present in markup)', async () => {
    const { body } = await mountHeader()
    const logos = body.findAll('img[alt="onluxe"]')
    expect(logos).toHaveLength(2)
    expect(logos[0]!.attributes('src')).toBe('/onluxe-logo.svg')
    expect(logos[1]!.attributes('src')).toBe('/onluxe-logo-dark.svg')
  })

  it('renders the location indicator', async () => {
    const { body } = await mountHeader()
    expect(body.text()).toContain('São Paulo')
  })

  it('renders the color mode toggle', async () => {
    const { wrapper } = await mountHeader()
    expect(wrapper.findComponent({ name: 'UColorModeButton' }).exists()).toBe(true)
  })

  it('opens a mobile menu with the main application links', async () => {
    const { body } = await mountHeader()

    await body.find('button[aria-label="Abrir menu"]').trigger('click')

    expect(body.text()).toContain('Navegação')
    expect(body.text()).toContain('Home')
    expect(body.text()).toContain('Buscar')
    expect(body.text()).toContain('Favoritos')
    expect(body.text()).toContain('Termos')
    expect(body.text()).toContain('Privacidade')
    expect(body.text()).toContain('Suporte')
  })

  it('closes the mobile menu when the close button is clicked', async () => {
    const { body } = await mountHeader()

    await body.find('button[aria-label="Abrir menu"]').trigger('click')
    expect(document.body.innerHTML).toContain('data-state="open"')

    await body.find('button.rounded-full[aria-label="Fechar menu"]').trigger('click')
    expect(document.body.innerHTML).not.toContain('data-state="open"')
  })
})
