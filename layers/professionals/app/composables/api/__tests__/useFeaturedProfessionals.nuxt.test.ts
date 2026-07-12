import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useFeaturedProfessionals } from '../useFeaturedProfessionals'

const { serverQuery, listProfessionals } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, fn: unknown) => ({ key, fn })),
  listProfessionals: vi.fn(async () => ({ data: [{ id: 'p1' }], meta: { total: 1, page: 1, totalPages: 1 } }))
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({
  listProfessionals,
  listProfessions: vi.fn(),
  getProfessional: vi.fn()
}))

describe('useFeaturedProfessionals', () => {
  it('scopes the key by limit', () => {
    const result = useFeaturedProfessionals(6) as unknown as { key: unknown[] }

    expect(result.key).toEqual(['featured-professionals', 6])
  })

  it('fetches featured sorted and returns the data array', async () => {
    const result = useFeaturedProfessionals(6) as unknown as { fn: () => Promise<unknown[]> }

    const data = await result.fn()

    expect(listProfessionals).toHaveBeenCalledWith({ sort: 'featured', limit: 6 })
    expect(data).toEqual([{ id: 'p1' }])
  })
})
