export function useApi<T>(
  path: string,
  options?: Parameters<typeof $fetch<T>>[1]
) {
  const { apiBase } = useRuntimeConfig().public

  return $fetch<T>(path, {
    baseURL: apiBase || undefined,
    ...options
  })
}
