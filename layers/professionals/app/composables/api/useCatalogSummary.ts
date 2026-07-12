import { getCatalogSummary } from '../../services/professionals'

export function useCatalogSummary() {
  return useServerQuery(
    ['catalog-summary'],
    getCatalogSummary,
    { staleTime: 1000 * 60 * 5 }
  )
}
