import { tanstackAdapter } from '../../data/adapters/tanstack'
import type { ServerInfiniteOptions, ServerInfiniteResult, ServerQueryKey } from '../../data/types'

export function useServerInfiniteQuery<TPage, TItem, TParam>(
  key: ServerQueryKey,
  fetchPage: (pageParam: TParam) => Promise<TPage>,
  options: ServerInfiniteOptions<TPage, TItem, TParam>
): ServerInfiniteResult<TItem> {
  return tanstackAdapter.infiniteQuery(key, fetchPage, options)
}
