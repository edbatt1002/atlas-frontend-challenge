import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useProfessional } from '../useProfessional'

const { serverQuery, getProfessional } = vi.hoisted(() => ({
  serverQuery: vi.fn((key: unknown, fn: unknown) => ({ key, fn })),
  getProfessional: vi.fn(async () => ({ id: 'p1', name: 'Ana' }))
}))

mockNuxtImport('useServerQuery', () => serverQuery)

vi.mock('../../../services/professionals', () => ({
  getProfessional,
  listProfessionals: vi.fn(),
  listProfessions: vi.fn()
}))

describe('useProfessional', () => {
  it('builds a reactive key scoped by id', () => {
    const result = useProfessional('p1') as unknown as { key: () => unknown[] }

    expect(toValue(result.key)).toEqual(['professional', 'p1'])
    expect(serverQuery).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      { throwOnServerError: true }
    )
  })

  it('fetches through the service by id', async () => {
    const result = useProfessional('p1') as unknown as { fn: () => Promise<unknown> }

    await result.fn()

    expect(getProfessional).toHaveBeenCalledWith('p1')
  })
})
