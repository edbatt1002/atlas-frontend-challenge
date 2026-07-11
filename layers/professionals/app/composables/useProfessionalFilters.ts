import type { ProfessionalListParams, ProfessionalSort } from '../types'

export interface ProfessionalFilterState {
  search: string
  profession?: string
  minPrice?: number
  maxPrice?: number
  sort?: ProfessionalSort
}

export function filtersToQuery(filters: ProfessionalFilterState, search: string): ProfessionalListParams {
  return {
    ...(search ? { search } : {}),
    ...(filters.profession ? { profession: filters.profession } : {}),
    ...(filters.minPrice != null ? { minPrice: filters.minPrice } : {}),
    ...(filters.maxPrice != null ? { maxPrice: filters.maxPrice } : {}),
    ...(filters.sort ? { sort: filters.sort } : {})
  }
}

export function useProfessionalFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<ProfessionalFilterState>({
    search: (route.query.search as string) ?? '',
    profession: (route.query.profession as string) || undefined,
    minPrice: route.query.minPrice ? Number(route.query.minPrice) : undefined,
    maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : undefined,
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

  const query = computed<ProfessionalListParams>(() => filtersToQuery(filters, debouncedSearch.value))

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
