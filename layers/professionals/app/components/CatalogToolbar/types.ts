import type { CatalogSheetMode } from '../../types'

export interface CatalogToolbarProps {
  filterCount: number
}

export interface CatalogToolbarEmits {
  open: [mode: CatalogSheetMode]
}
