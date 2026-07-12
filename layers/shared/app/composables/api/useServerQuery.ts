import { tanstackAdapter } from '../../data/adapters/tanstack'
import type { ServerQueryKey, ServerQueryOptions, ServerQueryResult } from '../../data/types'

export function useServerQuery<T>(
  key: ServerQueryKey,
  fetcher: () => Promise<T>,
  options?: ServerQueryOptions
): ServerQueryResult<T> {
  return tanstackAdapter.query(key, fetcher, options)
}
