import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { getNextProfessionalsPage, useProfessionals } from '../useProfessionals'
import type { ProfessionalListResponse } from '../../../types'

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

function response(page: number, totalPages: number): ProfessionalListResponse {
  return { data: [], meta: { page, limit: 24, total: totalPages * 24, totalPages } }
}

describe('getNextProfessionalsPage', () => {
  it('returns the next page number while more pages remain', () => {
    expect(getNextProfessionalsPage(response(1, 5))).toBe(2)
    expect(getNextProfessionalsPage(response(4, 5))).toBe(5)
  })

  it('returns undefined on the last page', () => {
    expect(getNextProfessionalsPage(response(5, 5))).toBeUndefined()
  })

  it('returns undefined when there is a single page', () => {
    expect(getNextProfessionalsPage(response(1, 1))).toBeUndefined()
  })
})

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
