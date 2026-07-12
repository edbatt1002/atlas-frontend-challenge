import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useProfessions } from '../useProfessions'

const { serverQuery, listProfessions } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, fn: unknown) => ({ key, fn })),
  listProfessions: vi.fn(async () => [{ label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' }])
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({
  listProfessions,
  listProfessionals: vi.fn(),
  getProfessional: vi.fn()
}))

describe('useProfessions', () => {
  it('uses a static professions key', () => {
    const result = useProfessions() as unknown as { key: unknown[] }

    expect(result.key).toEqual(['professions'])
  })

  it('fetches the professions list', async () => {
    const result = useProfessions() as unknown as { fn: () => Promise<unknown> }

    await result.fn()

    expect(listProfessions).toHaveBeenCalled()
  })
})
