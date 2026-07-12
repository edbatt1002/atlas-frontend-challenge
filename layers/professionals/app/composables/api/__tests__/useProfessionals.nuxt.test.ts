import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useProfessionals } from '../useProfessionals'

const { infiniteQuery, listProfessionals } = vi.hoisted(() => ({
  infiniteQuery: vi.fn((key: unknown, fn: unknown, options: unknown) => ({ key, fn, options })),
  listProfessionals: vi.fn(async () => ({ data: [{ id: 'p1' }], meta: { total: 1, page: 1, totalPages: 1 } }))
}))

mockNuxtImport('useServerInfiniteQuery', () => infiniteQuery)

vi.mock('../../../services/professionals', () => ({
  listProfessionals,
  listProfessions: vi.fn(),
  getProfessional: vi.fn()
}))

interface InfiniteResult {
  key: () => unknown[]
  fn: (page: number) => Promise<unknown>
  options: {
    initialPageParam: number
    getNextPageParam: (last: { meta: { page: number, totalPages: number } }) => number | undefined
    selectItems: (page: { data: unknown[] }) => unknown[]
  }
}

describe('useProfessionals', () => {
  it('builds a key scoped by the reactive filters', () => {
    const result = useProfessionals(() => ({ profession: 'modelo' })) as unknown as InfiniteResult

    expect(toValue(result.key)).toEqual(['professionals', { profession: 'modelo' }])
  })

  it('fetches a page merging filters with the page param', async () => {
    const result = useProfessionals(() => ({ profession: 'modelo' })) as unknown as InfiniteResult

    await result.fn(3)

    expect(listProfessionals).toHaveBeenCalledWith({ profession: 'modelo', page: 3 })
  })

  it('wires pagination options', () => {
    const result = useProfessionals() as unknown as InfiniteResult

    expect(result.options.initialPageParam).toBe(1)
    expect(result.options.getNextPageParam({ meta: { page: 1, totalPages: 3 } })).toBe(2)
    expect(result.options.getNextPageParam({ meta: { page: 3, totalPages: 3 } })).toBeUndefined()
    expect(result.options.selectItems({ data: [{ id: 'p1' }] })).toEqual([{ id: 'p1' }])
  })
})
