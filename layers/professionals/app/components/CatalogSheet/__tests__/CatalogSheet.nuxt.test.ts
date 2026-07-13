import { defineComponent, h } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UApp from '@nuxt/ui/components/App.vue'
import CatalogSheet from '../CatalogSheet.vue'
import type { CatalogSheetProps } from '../types'
import type { Profession } from '../../../types'

const professions: Profession[] = [
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'Massoterapeuta', slug: 'massoterapeuta', icon: 'i-lucide-hand' }
]

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountSheet(props: CatalogSheetProps) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(CatalogSheet, props)
      })
    }
  })
  activeWrapper = await mountSuspended(Host, { attachTo: document.body })
  return {
    sheet: activeWrapper.findComponent(CatalogSheet),
    body: new DOMWrapper(document.body)
  }
}

describe('CatalogSheet', () => {
  it('renders nothing when mode is null', async () => {
    const { body } = await mountSheet({ mode: null, professions })

    expect(body.text()).not.toContain('Filtros')
  })

  it('renders the filter sections and profession chips in filter mode', async () => {
    const { body } = await mountSheet({ mode: 'filter', professions })
    const text = body.text()

    expect(text).toContain('Filtros')
    expect(text).toContain('Profissão')
    expect(text).toContain('Modelo')
    expect(text).toContain('Massoterapeuta')
  })

  it('emits update:profession when a chip is clicked', async () => {
    const { sheet, body } = await mountSheet({ mode: 'filter', professions })
    const chip = body.findAll('button').find(b => b.text() === 'Modelo')

    await chip!.trigger('click')

    expect(sheet.emitted('update:profession')).toEqual([['modelo']])
  })

  it('emits clear without closing when Limpar is clicked', async () => {
    const { sheet, body } = await mountSheet({ mode: 'filter', professions })
    const clearButton = body.findAll('button').find(b => b.text() === 'Limpar')

    await clearButton!.trigger('click')

    expect(sheet.emitted('clear')).toHaveLength(1)
    expect(sheet.emitted('close')).toBeUndefined()
  })

  it('renders sort options and emits update:sort + close on selection', async () => {
    const { sheet, body } = await mountSheet({ mode: 'sort', professions })
    const option = body.findAll('button').find(b => b.text().includes('Novidades'))

    await option!.trigger('click')

    expect(sheet.emitted('update:sort')).toEqual([['newest']])
    expect(sheet.emitted('close')).toHaveLength(1)
  })

  it('renders the geo prompt and emits update:sort nearest + close on allow', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: { watchPosition: vi.fn(), clearWatch: vi.fn() },
      configurable: true
    })

    const { sheet, body } = await mountSheet({ mode: 'geo', professions })
    expect(body.text()).toContain('Usar sua localização?')

    const allowButton = body.findAll('button').find(b => b.text().includes('Permitir localização'))
    await allowButton!.trigger('click')

    expect(sheet.emitted('update:sort')).toEqual([['nearest']])
    expect(sheet.emitted('close')).toHaveLength(1)
  })

  it('closes when the close button is clicked', async () => {
    const { sheet, body } = await mountSheet({ mode: 'sort', professions })

    await body.find('[aria-label="Fechar"]').trigger('click')

    expect(sheet.emitted('close')).toHaveLength(1)
  })
})
