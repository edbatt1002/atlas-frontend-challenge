import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useProfessionalTotal } from '../useProfessionalTotal'

const { serverQuery, listProfessionals } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, fn: unknown) => ({ key, fn })),
  listProfessionals: vi.fn(async () => ({ data: [], meta: { total: 512, page: 1, totalPages: 1 } }))
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({
  listProfessionals,
  listProfessions: vi.fn(),
  getProfessional: vi.fn()
}))

describe('useProfessionalTotal', () => {
  it('uses the total key', () => {
    const result = useProfessionalTotal() as unknown as { key: unknown[] }

    expect(result.key).toEqual(['professionals-total'])
  })

  it('extracts meta.total from a minimal listing', async () => {
    const result = useProfessionalTotal() as unknown as { fn: () => Promise<number> }

    const total = await result.fn()

    expect(listProfessionals).toHaveBeenCalledWith({ limit: 1 })
    expect(total).toBe(512)
  })
})
