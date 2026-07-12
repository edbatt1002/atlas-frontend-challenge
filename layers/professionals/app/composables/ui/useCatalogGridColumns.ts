import { breakpointsTailwind } from '@vueuse/core'

export function columnsForBreakpoints(isSm: boolean, isLg: boolean, isXl: boolean): number {
  if (isXl) return 4
  if (isLg) return 3
  if (isSm) return 2
  return 1
}

export function useCatalogGridColumns() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isSm = breakpoints.greaterOrEqual('sm')
  const isLg = breakpoints.greaterOrEqual('lg')
  const isXl = breakpoints.greaterOrEqual('xl')

  return computed(() => columnsForBreakpoints(isSm.value, isLg.value, isXl.value))
}
