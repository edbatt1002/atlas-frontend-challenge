import { defineComponent, h } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UApp from '@nuxt/ui/components/App.vue'
import CatalogToolbar from '../CatalogToolbar.vue'

describe('CatalogToolbar', () => {
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

  it('shows the picked state label, or a placeholder when none is picked', async () => {
    const withState = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'state': 'SP', 'onUpdate:state': () => {} }
    })
    expect(withState.text()).toContain('São Paulo · SP')

    const withoutState = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'state': undefined, 'onUpdate:state': () => {} }
    })
    expect(withoutState.text()).toContain('Buscar por endereço')
  })

  it('shows the filter badge only when there are active filters', async () => {
    const withFilters = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 2, 'state': undefined, 'onUpdate:state': () => {} }
    })
    expect(withFilters.text()).toContain('2')

    const withoutFilters = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'state': undefined, 'onUpdate:state': () => {} }
    })
    expect(withoutFilters.text()).not.toMatch(/\d/)
  })

  it('emits open with the right mode for each button', async () => {
    const wrapper = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'state': undefined, 'onUpdate:state': () => {} }
    })
    const buttons = wrapper.findAll('button')

    await buttons[1]!.trigger('click')
    await buttons[2]!.trigger('click')
    await buttons[3]!.trigger('click')

    expect(wrapper.emitted('open')).toEqual([['filter'], ['geo'], ['sort']])
  })

  it('opens the region picker and updates the state model when a region is picked', async () => {
    const emitted: string[][] = []
    const Host = defineComponent({
      setup() {
        return () => h(UApp, null, {
          default: () => h(CatalogToolbar, {
            'filterCount': 0,
            'state': undefined,
            'onUpdate:state': (value: string | undefined) => emitted.push([value ?? ''])
          })
        })
      }
    })
    const wrapper = await mountSuspended(Host, { attachTo: document.body })
    const body = new DOMWrapper(document.body)

    await body.find('button').trigger('click')
    const spOption = body.findAll('button').find(b => b.text().includes('São Paulo · SP'))
    await spOption!.trigger('click')

    expect(emitted).toEqual([['SP']])
    wrapper.unmount()
  })

  it('clears the picked state when the current location is used', async () => {
    const emitted: (string | undefined)[] = []
    const Host = defineComponent({
      setup() {
        return () => h(UApp, null, {
          default: () => h(CatalogToolbar, {
            'filterCount': 0,
            'state': 'SP',
            'onUpdate:state': (value: string | undefined) => emitted.push(value)
          })
        })
      }
    })
    const wrapper = await mountSuspended(Host, { attachTo: document.body })
    const body = new DOMWrapper(document.body)

    await body.find('button').trigger('click')
    const locationButton = body.findAll('button').find(b => b.text().includes('Usar minha localização atual'))
    await locationButton!.trigger('click')

    expect(emitted).toContain(undefined)
    wrapper.unmount()
  })
})
