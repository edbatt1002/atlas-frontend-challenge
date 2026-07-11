import type { FetchError } from 'ofetch'

export interface ResolveApiUrlOptions {
  baseURL?: string
  apiBase?: string
  origin?: string
  isServer: boolean
}

export function resolveApiUrl(path: string, options: ResolveApiUrlOptions) {
  const base = options.baseURL || options.apiBase || (options.isServer ? options.origin : '') || ''
  return base ? new URL(path, base).toString() : path
}

function useApiUrl(path: string, baseURL?: string) {
  const { apiBase } = useRuntimeConfig().public
  return resolveApiUrl(path, {
    baseURL,
    apiBase,
    origin: import.meta.server ? useRequestURL().origin : undefined,
    isServer: import.meta.server
  })
}

export type ApiResult<T>
  = | { data: T, error: null }
    | { data: null, error: FetchError }

export async function useApi<T>(
  path: string,
  options?: Parameters<typeof $fetch<T>>[1] & { baseURL?: string }
): Promise<ApiResult<T>> {
  const { baseURL, ...fetchOptions } = options ?? {}

  try {
    const data = await $fetch<T>(useApiUrl(path, baseURL), fetchOptions)
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as FetchError }
  }
}
