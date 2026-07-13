import { getCatalogSummary } from '../../services/professionals'

export function useCatalogSummary() {
  return useServerQuery(
    ['catalog-summary'],
    getCatalogSummary,
    { staleTime: FIVE_MINUTES_MS }
  )
}
