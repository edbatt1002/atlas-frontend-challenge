import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useProfessionalFilters } from '../useProfessionalFilters'

const { routeState, replace } = vi.hoisted(() => ({
  routeState: { query: {} as Record<string, string> },
  replace: vi.fn()
}))

mockNuxtImport('useRoute', () => () => routeState)
mockNuxtImport('useRouter', () => () => ({
  replace,
  beforeEach: () => {},
  afterEach: () => {},
  beforeResolve: () => {},
  onError: () => {}
}))

describe('useProfessionalFilters', () => {
  beforeEach(() => {
    routeState.query = {}
    replace.mockClear()
  })

  it('initializes state from the route query', () => {
    routeState.query = { search: 'ana', profession: 'modelo', online: 'true', min_rating: '4.5', sort: 'rating' }

    const { filters, activeFilterCount } = useProfessionalFilters()

    expect(filters.search).toBe('ana')
    expect(filters.profession).toBe('modelo')
    expect(filters.online).toBe(true)
    expect(filters.minRating).toBe(4.5)
    expect(filters.sort).toBe('rating')
    expect(activeFilterCount.value).toBe(3)
  })

  it('reflects a non-search filter change in the query immediately', () => {
    const { filters, query } = useProfessionalFilters()

    filters.profession = 'dj'

    expect(query.value.profession).toBe('dj')
  })

  it('debounces the search into the query', async () => {
    vi.useFakeTimers()
    const { filters, query } = useProfessionalFilters()

    filters.search = 'lu'
    await nextTick()
    expect(query.value.search).toBeUndefined()

    vi.advanceTimersByTime(300)
    expect(query.value.search).toBe('lu')

    vi.useRealTimers()
  })

  it('reset clears every filter', () => {
    routeState.query = { profession: 'modelo', online: 'true', min_rating: '4' }
    const { filters, activeFilterCount, reset } = useProfessionalFilters()
    expect(activeFilterCount.value).toBe(3)

    reset()

    expect(filters.profession).toBeUndefined()
    expect(filters.online).toBeUndefined()
    expect(filters.minRating).toBeUndefined()
    expect(activeFilterCount.value).toBe(0)
  })
})
