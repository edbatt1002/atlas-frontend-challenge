import { useServerQuery } from '../useServerQuery'

const { query, infiniteQuery } = vi.hoisted(() => ({
  query: vi.fn(() => ({ data: 'result' })),
  infiniteQuery: vi.fn()
}))

vi.mock('../../../data/adapters/tanstack', () => ({
  tanstackAdapter: { query, infiniteQuery }
}))

describe('useServerQuery', () => {
  it('forwards key, fetcher and options to the tanstack adapter', () => {
    const key = ['professional', 'p1']
    const fetcher = async () => 1
    const options = { staleTime: 5000 }

    const result = useServerQuery(key, fetcher, options)

    expect(query).toHaveBeenCalledWith(key, fetcher, options)
    expect(result).toEqual({ data: 'result' })
  })
})
