export interface ServerQueryResult<T> {
  data: Ref<T | undefined>
  isPending: Ref<boolean>
  error: Ref<Error | null>
  refetch: () => Promise<unknown>
}

export interface ServerInfiniteResult<TItem> {
  items: Ref<TItem[]>
  isPending: Ref<boolean>
  error: Ref<Error | null>
  hasNextPage: Ref<boolean>
  fetchNextPage: () => Promise<unknown>
  refetch: () => Promise<unknown>
}

export type ServerQueryKey = MaybeRefOrGetter<readonly unknown[]>

export interface ServerQueryOptions {
  staleTime?: number
}

export interface ServerInfiniteOptions<TPage, TItem, TParam> extends ServerQueryOptions {
  initialPageParam: TParam
  getNextPageParam: (lastPage: TPage, allPages: TPage[]) => TParam | undefined | null
  selectItems: (page: TPage) => TItem[]
}

export interface DataAdapter {
  query: <T>(
    key: ServerQueryKey,
    fetcher: () => Promise<T>,
    options?: ServerQueryOptions
  ) => ServerQueryResult<T>
  infiniteQuery: <TPage, TItem, TParam>(
    key: ServerQueryKey,
    fetchPage: (pageParam: TParam) => Promise<TPage>,
    options: ServerInfiniteOptions<TPage, TItem, TParam>
  ) => ServerInfiniteResult<TItem>
}
