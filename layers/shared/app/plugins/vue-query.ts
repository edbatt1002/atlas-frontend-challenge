import { QueryClient, VueQueryPlugin, dehydrate, hydrate } from '@tanstack/vue-query'
import type { DehydratedState } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        retry: (failureCount, error) => {
          const statusCode = (error as { statusCode?: number }).statusCode
          if (statusCode && statusCode >= 400 && statusCode < 500) return false
          return failureCount < 2
        }
      }
    }
  })

  const vueQueryState = useState<DehydratedState | null>('vue-query')

  nuxt.vueApp.use(VueQueryPlugin, { queryClient })

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
