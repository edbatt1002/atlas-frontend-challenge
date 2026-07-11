import { computed, onServerPrefetch, toValue } from 'vue'
import type { Ref } from 'vue'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type {
  DataAdapter,
  ServerInfiniteOptions,
  ServerInfiniteResult,
  ServerQueryKey,
  ServerQueryOptions,
  ServerQueryResult
} from '../types'

export const tanstackAdapter: DataAdapter = {
  query<T>(
    key: ServerQueryKey,
    fetcher: () => Promise<T>,
    options?: ServerQueryOptions
  ): ServerQueryResult<T> {
    const result = useQuery({
      queryKey: computed(() => [...toValue(key)]),
      queryFn: () => fetcher(),
      staleTime: options?.staleTime
    })

    if (import.meta.server) onServerPrefetch(() => result.suspense())

    return {
      data: result.data,
      isPending: result.isPending,
      error: result.error as Ref<Error | null>,
      refetch: result.refetch
    }
  },

  infiniteQuery<TPage, TItem, TParam>(
    key: ServerQueryKey,
    fetchPage: (pageParam: TParam) => Promise<TPage>,
    options: ServerInfiniteOptions<TPage, TItem, TParam>
  ): ServerInfiniteResult<TItem> {
    const result = useInfiniteQuery({
      queryKey: computed(() => [...toValue(key)]),
      queryFn: ({ pageParam }) => fetchPage(pageParam as TParam),
      initialPageParam: options.initialPageParam as never,
      getNextPageParam: options.getNextPageParam as never,
      staleTime: options.staleTime
    })

    if (import.meta.server) onServerPrefetch(() => result.suspense())

    const items = computed(() =>
      ((result.data.value?.pages ?? []) as TPage[]).flatMap(options.selectItems)
    )

    return {
      items,
      isPending: result.isPending,
      error: result.error as Ref<Error | null>,
      hasNextPage: result.hasNextPage,
      fetchNextPage: result.fetchNextPage,
      refetch: result.refetch
    }
  }
}
