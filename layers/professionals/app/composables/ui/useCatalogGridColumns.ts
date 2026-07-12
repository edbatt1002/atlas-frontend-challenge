import { breakpointsTailwind } from '@vueuse/core'

export interface ActiveBreakpoints {
  sm: boolean
  lg: boolean
  xl: boolean
}

export function columnsForBreakpoints({ sm, lg, xl }: ActiveBreakpoints): number {
  if (xl) return 4
  if (lg) return 3
  if (sm) return 2
  return 1
}

export function useCatalogGridColumns() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isSm = breakpoints.greaterOrEqual('sm')
  const isLg = breakpoints.greaterOrEqual('lg')
  const isXl = breakpoints.greaterOrEqual('xl')

  return computed(() => columnsForBreakpoints({ sm: isSm.value, lg: isLg.value, xl: isXl.value }))
}
