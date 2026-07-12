import { mountSuspended } from '@nuxt/test-utils/runtime'
import GeoPrompt from '../GeoPrompt.vue'

describe('GeoPrompt', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: { watchPosition: vi.fn(), clearWatch: vi.fn() },
      configurable: true
    })
  })

  it('renders the prompt', async () => {
    const wrapper = await mountSuspended(GeoPrompt)

    expect(wrapper.text()).toContain('Usar sua localização?')
  })

  it('emits update:sort nearest, geoAllow and close on allow', async () => {
    const wrapper = await mountSuspended(GeoPrompt)
    const allow = wrapper.findAll('button').find(b => b.text().includes('Permitir localização'))

    await allow!.trigger('click')

    expect(wrapper.emitted('update:sort')).toEqual([['nearest']])
    expect(wrapper.emitted('geoAllow')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close without changing sort on dismiss', async () => {
    const wrapper = await mountSuspended(GeoPrompt)
    const dismiss = wrapper.findAll('button').find(b => b.text().includes('Agora não'))

    await dismiss!.trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('update:sort')).toBeUndefined()
  })
})
