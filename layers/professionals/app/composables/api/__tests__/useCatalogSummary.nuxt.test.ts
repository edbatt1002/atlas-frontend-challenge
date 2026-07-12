import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useCatalogSummary } from '../useCatalogSummary'

const { serverQuery, getCatalogSummary } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, fn: unknown, options: unknown) => ({ key, fn, options })),
  getCatalogSummary: vi.fn(async () => ({ total: 600, professions: [], counts: {} }))
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({ getCatalogSummary }))

describe('useCatalogSummary', () => {
  it('fetches the aggregated home summary through TanStack', async () => {
    const result = useCatalogSummary() as unknown as { fn: () => Promise<unknown>, options: unknown }

    expect(await result.fn()).toEqual({ total: 600, professions: [], counts: {} })
    expect(result.options).toEqual({ staleTime: 1000 * 60 * 5 })
  })
})
