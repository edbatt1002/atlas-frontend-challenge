import type { CatalogSheetMode, Profession } from '../../types'

export interface CatalogSheetProps {
  mode: CatalogSheetMode | null
  professions: Profession[]
}

export interface CatalogSheetEmits {
  close: []
  clear: []
  geoAllow: []
}
