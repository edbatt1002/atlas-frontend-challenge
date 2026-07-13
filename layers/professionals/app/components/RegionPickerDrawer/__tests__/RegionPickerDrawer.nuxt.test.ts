import { defineComponent, h } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UApp from '@nuxt/ui/components/App.vue'
import RegionPickerDrawer from '../RegionPickerDrawer.vue'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(async () => {
  await nextTick()
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountDrawer(open = true) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(RegionPickerDrawer, { open })
      })
    }
  })
  activeWrapper = await mountSuspended(Host, { attachTo: document.body })
  return { wrapper: activeWrapper, body: new DOMWrapper(document.body) }
}

describe('RegionPickerDrawer', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        watchPosition: (success: PositionCallback) => {
          success({
            coords: { latitude: -23.5, longitude: -46.6, accuracy: 10, altitude: null, altitudeAccuracy: null, heading: null, speed: null },
            timestamp: 0
          } as GeolocationPosition)
          return 1
        },
        clearWatch: vi.fn()
      },
      configurable: true
    })
  })

  it('renders the state list when open', async () => {
    const { body } = await mountDrawer()

    expect(body.text()).toContain('São Paulo · SP')
  })

  it('emits select and update:open when a state is picked', async () => {
    const { wrapper, body } = await mountDrawer()
    const drawer = wrapper.findComponent(RegionPickerDrawer)
    const spOption = body.findAll('button').find(b => b.text().includes('São Paulo · SP'))

    await spOption!.trigger('click')

    expect(drawer.emitted('select')).toEqual([[{ code: 'SP', name: 'São Paulo' }]])
    expect(drawer.emitted('update:open')).toEqual([[false]])
  })

  it('filters the state list as the user types', async () => {
    const { body } = await mountDrawer()

    await body.find('input').setValue('rio')

    expect(body.text()).toContain('Rio de Janeiro')
    expect(body.text()).not.toContain('Minas Gerais')
  })

  it('emits update:open when the close button is clicked', async () => {
    const { wrapper, body } = await mountDrawer()
    const drawer = wrapper.findComponent(RegionPickerDrawer)

    await body.find('[aria-label="Fechar"]').trigger('click')

    expect(drawer.emitted('update:open')).toEqual([[false]])
  })

  it('emits useLocation and closes when the current location is used', async () => {
    const { wrapper, body } = await mountDrawer()
    const drawer = wrapper.findComponent(RegionPickerDrawer)
    const locationButton = body.findAll('button').find(b => b.text().includes('Usar minha localização atual'))

    await locationButton!.trigger('click')
    await nextTick()

    expect(drawer.emitted('useLocation')).toHaveLength(1)
    expect(drawer.emitted('update:open')?.at(-1)).toEqual([false])
  })
})
