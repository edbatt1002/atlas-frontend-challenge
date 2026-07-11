import type { ProfessionalListParams, ProfessionalSort } from '../types'

export interface ProfessionalFilterState {
  search: string
  profession?: string
  minPrice?: number
  maxPrice?: number
  sort?: ProfessionalSort
}

type ProfessionalFilterQuery = Pick<ProfessionalListParams, 'search' | 'profession' | 'min_price' | 'max_price' | 'sort'>

export function filtersToQuery(filters: ProfessionalFilterState, search: string): ProfessionalFilterQuery {
  return {
    ...(search ? { search } : {}),
    ...(filters.profession ? { profession: filters.profession } : {}),
    ...(filters.minPrice != null ? { min_price: filters.minPrice } : {}),
    ...(filters.maxPrice != null ? { max_price: filters.maxPrice } : {}),
    ...(filters.sort ? { sort: filters.sort } : {})
  }
}

export function useProfessionalFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<ProfessionalFilterState>({
    search: (route.query.search as string) ?? '',
    profession: (route.query.profession as string) || undefined,
    minPrice: route.query.min_price ? Number(route.query.min_price) : undefined,
    maxPrice: route.query.max_price ? Number(route.query.max_price) : undefined,
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

  watch(query, (q) => {
    router.replace({ query: { ...q } })
  })

  function reset() {
    filters.search = ''
    debouncedSearch.value = ''
    filters.profession = undefined
    filters.minPrice = undefined
    filters.maxPrice = undefined
    filters.sort = undefined
  }

  return { filters, query, reset }
}
