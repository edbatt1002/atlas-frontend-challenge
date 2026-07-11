import { resolveApiUrl } from '../useApi'

describe('resolveApiUrl', () => {
  it('returns the path unchanged on the client with no base configured', () => {
    expect(resolveApiUrl('/api/professionals', { isServer: false })).toBe('/api/professionals')
  })

  it('prefers an explicit baseURL over the configured apiBase', () => {
    expect(resolveApiUrl('/users', {
      baseURL: 'https://explicit.example',
      apiBase: 'https://default.example',
      isServer: false
    })).toBe('https://explicit.example/users')
  })

  it('falls back to apiBase when no explicit baseURL is given', () => {
    expect(resolveApiUrl('/professionals', {
      apiBase: 'https://default.example',
      isServer: false
    })).toBe('https://default.example/professionals')
  })

  it('uses the request origin during SSR when neither baseURL nor apiBase is set', () => {
    expect(resolveApiUrl('/professionals', {
      isServer: true,
      origin: 'http://localhost:3000'
    })).toBe('http://localhost:3000/professionals')
  })

  it('stays relative on the client even with an origin available, when no base is set', () => {
    expect(resolveApiUrl('/professionals', {
      isServer: false,
      origin: 'http://localhost:3000'
    })).toBe('/professionals')
  })
})
