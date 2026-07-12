import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { countActiveFilters, filtersToQuery, useProfessionalFilters } from '../useProfessionalFilters'
import type { ProfessionalFilterState } from '../useProfessionalFilters'

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

const empty: ProfessionalFilterState = { search: '' }

describe('filtersToQuery', () => {
  it('returns an empty object when no filter is active', () => {
    expect(filtersToQuery(empty, '')).toEqual({})
  })

  it('includes only the active filters, translated to the API (snake_case, english) vocabulary', () => {
    const filters: ProfessionalFilterState = {
      search: 'ignored',
      profession: 'modelo',
      state: 'SP',
      online: true,
      maxPrice: 500,
      minRating: 4.5,
      sort: 'price'
    }

    expect(filtersToQuery(filters, 'ana')).toEqual({
      search: 'ana',
      profession: 'modelo',
      state: 'SP',
      online: true,
      max_price: 500,
      min_rating: 4.5,
      sort: 'price'
    })
  })

  it('drops empty search and undefined fields', () => {
    const filters: ProfessionalFilterState = { search: '', profession: undefined, maxPrice: undefined }

    expect(filtersToQuery(filters, '')).toEqual({})
  })

  it('keeps a zero min_price (present, not empty)', () => {
    const filters: ProfessionalFilterState = { search: '', minPrice: 0 }

    expect(filtersToQuery(filters, '')).toEqual({ min_price: 0 })
  })

  it('drops online when false', () => {
    const filters: ProfessionalFilterState = { search: '', online: false }

    expect(filtersToQuery(filters, '')).toEqual({})
  })
})

describe('countActiveFilters', () => {
  it('returns 0 when nothing is active', () => {
    expect(countActiveFilters(empty)).toBe(0)
  })

  it('counts profession, state, online, maxPrice and minRating as one each', () => {
    const filters: ProfessionalFilterState = {
      search: '',
      profession: 'modelo',
      state: 'SP',
      online: true,
      maxPrice: 500,
      minRating: 4
    }

    expect(countActiveFilters(filters)).toBe(5)
  })

  it('does not count search or sort', () => {
    const filters: ProfessionalFilterState = { search: 'ana', sort: 'price' }

    expect(countActiveFilters(filters)).toBe(0)
  })
})

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
