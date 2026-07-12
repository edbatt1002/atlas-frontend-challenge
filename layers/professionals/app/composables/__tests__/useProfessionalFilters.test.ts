import { countActiveFilters, filtersToQuery } from '../useProfessionalFilters'
import type { ProfessionalFilterState } from '../useProfessionalFilters'

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
