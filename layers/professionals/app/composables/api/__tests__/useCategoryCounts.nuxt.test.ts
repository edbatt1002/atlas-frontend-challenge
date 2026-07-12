import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useCategoryCounts } from '../useCategoryCounts'

const { serverQuery, listProfessionals } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, _fn: unknown) => ({ data: key })),
  listProfessionals: vi.fn(async () => ({ data: [], meta: { total: 7, page: 1, totalPages: 1 } }))
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({
  listProfessionals,
  listProfessions: vi.fn(),
  getProfessional: vi.fn()
}))

describe('useCategoryCounts', () => {
  beforeEach(() => {
    serverQuery.mockClear()
    listProfessionals.mockClear()
  })

  it('returns a record keyed by each slug', () => {
    const counts = useCategoryCounts(['modelo', 'dj'])

    expect(Object.keys(counts)).toEqual(['modelo', 'dj'])
  })

  it('registers a per-slug query with the category-count key', () => {
    useCategoryCounts(['modelo'])

    expect(serverQuery.mock.calls[0]![0]).toEqual(['category-count', 'modelo'])
  })

  it('queries each slug with a minimal listing and extracts the total', async () => {
    useCategoryCounts(['modelo'])
    const queryFn = serverQuery.mock.calls[0]![1] as () => Promise<number>

    const total = await queryFn()

    expect(listProfessionals).toHaveBeenCalledWith({ profession: 'modelo', limit: 1 })
    expect(total).toBe(7)
  })
})
