import { filtersToQuery } from '../useProfessionalFilters'
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
      maxPrice: 500,
      sort: 'price'
    }

    expect(filtersToQuery(filters, 'ana')).toEqual({
      search: 'ana',
      profession: 'modelo',
      max_price: 500,
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
})
