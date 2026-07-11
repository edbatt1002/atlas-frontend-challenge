import type { ProfessionalListParams, ProfessionalSort } from '../types'

export interface ProfessionalFilterState {
  search: string
  profession?: string
  online?: boolean
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: ProfessionalSort
}

type ProfessionalFilterQuery = Pick<ProfessionalListParams, 'search' | 'profession' | 'online' | 'min_price' | 'max_price' | 'min_rating' | 'sort'>

export function filtersToQuery(filters: ProfessionalFilterState, search: string): ProfessionalFilterQuery {
  return {
    ...(search ? { search } : {}),
    ...(filters.profession ? { profession: filters.profession } : {}),
    ...(filters.online ? { online: filters.online } : {}),
    ...(filters.minPrice != null ? { min_price: filters.minPrice } : {}),
    ...(filters.maxPrice != null ? { max_price: filters.maxPrice } : {}),
    ...(filters.minRating != null ? { min_rating: filters.minRating } : {}),
    ...(filters.sort ? { sort: filters.sort } : {})
  }
}

export function countActiveFilters(filters: ProfessionalFilterState): number {
  return (
    (filters.profession ? 1 : 0)
    + (filters.online ? 1 : 0)
    + (filters.maxPrice != null ? 1 : 0)
    + (filters.minRating != null ? 1 : 0)
  )
}

export function useProfessionalFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<ProfessionalFilterState>({
    search: (route.query.search as string) ?? '',
    profession: (route.query.profession as string) || undefined,
    online: route.query.online === 'true' || undefined,
    minPrice: route.query.min_price ? Number(route.query.min_price) : undefined,
    maxPrice: route.query.max_price ? Number(route.query.max_price) : undefined,
    minRating: route.query.min_rating ? Number(route.query.min_rating) : undefined,
    sort: (route.query.sort as ProfessionalSort) || undefined
  })

  const debouncedSearch = ref(filters.search)
  let timer: ReturnType<typeof setTimeout>
  watch(
    () => filters.search,
    (value) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        debouncedSearch.value = value
      }, 300)
    }
  )

  const query = computed<ProfessionalFilterQuery>(() => filtersToQuery(filters, debouncedSearch.value))
  const activeFilterCount = computed(() => countActiveFilters(filters))

  watch(query, (q) => {
    router.replace({ query: { ...q, online: q.online ? 'true' : undefined } })
  })

  function reset() {
    filters.search = ''
    debouncedSearch.value = ''
    filters.profession = undefined
    filters.online = undefined
    filters.minPrice = undefined
    filters.maxPrice = undefined
    filters.minRating = undefined
    filters.sort = undefined
  }

  return { filters, query, activeFilterCount, reset }
}
