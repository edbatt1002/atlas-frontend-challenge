import { useServerInfiniteQuery } from '../useServerInfiniteQuery'

const { query, infiniteQuery } = vi.hoisted(() => ({
  query: vi.fn(),
  infiniteQuery: vi.fn(() => ({ items: [] }))
}))

vi.mock('../../../data/adapters/tanstack', () => ({
  tanstackAdapter: { query, infiniteQuery }
}))

describe('useServerInfiniteQuery', () => {
  it('forwards key, page fetcher and options to the tanstack adapter', () => {
    const key = ['professionals', {}]
    const fetchPage = async () => ({ data: [] })
    const options = {
      initialPageParam: 1,
      getNextPageParam: () => undefined,
      selectItems: (page: { data: unknown[] }) => page.data
    }

    const result = useServerInfiniteQuery(key, fetchPage, options)

    expect(infiniteQuery).toHaveBeenCalledWith(key, fetchPage, options)
    expect(result).toEqual({ items: [] })
  })
})
