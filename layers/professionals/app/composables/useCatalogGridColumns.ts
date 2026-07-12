import { breakpointsTailwind } from '@vueuse/core'

export function useCatalogGridColumns() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isSm = breakpoints.greaterOrEqual('sm')
  const isLg = breakpoints.greaterOrEqual('lg')
  const isXl = breakpoints.greaterOrEqual('xl')

  return computed(() => {
    if (isXl.value) return 4
    if (isLg.value) return 3
    if (isSm.value) return 2
    return 1
  })
}
