import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useApi } from '../useApi'

const { runtimeConfigMock } = vi.hoisted(() => ({
  runtimeConfigMock: vi.fn()
}))

mockNuxtImport('useRuntimeConfig', () => runtimeConfigMock)

describe('useApi', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset().mockResolvedValue({ ok: true })
    runtimeConfigMock.mockReset().mockReturnValue({ public: { apiBase: '' } })
    vi.stubGlobal('$fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('keeps internal API paths relative when no base is configured', async () => {
    await useApi('/api/professionals')

    expect(fetchMock).toHaveBeenCalledWith('/api/professionals', { baseURL: undefined })
  })

  it('uses the configured API base', async () => {
    runtimeConfigMock.mockReturnValue({
      public: { apiBase: 'https://default.example' }
    })

    await useApi('/professionals')

    expect(fetchMock).toHaveBeenCalledWith('/professionals', {
      baseURL: 'https://default.example'
    })
  })

  it('allows a request to override the configured API base', async () => {
    runtimeConfigMock.mockReturnValue({
      public: { apiBase: 'https://default.example' }
    })

    await useApi('/users', { baseURL: 'https://explicit.example' })

    expect(fetchMock).toHaveBeenCalledWith('/users', {
      baseURL: 'https://explicit.example'
    })
  })

  it('lets fetch errors propagate to the caller', async () => {
    const error = new Error('Request failed')
    fetchMock.mockRejectedValue(error)

    await expect(useApi('/api/professionals')).rejects.toBe(error)
  })
})
