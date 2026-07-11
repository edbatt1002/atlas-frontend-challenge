import type { CatalogSheetMode, Profession, ProfessionalSort } from '../../types'

export interface CatalogSheetProps {
  mode: CatalogSheetMode | null
  professions: Profession[]
  profession?: string
  online?: boolean
  maxPrice?: number
  minRating?: number
  sort?: ProfessionalSort
}

export interface CatalogSheetEmits {
  'close': []
  'clear': []
  'update:profession': [value: string | undefined]
  'update:online': [value: boolean | undefined]
  'update:maxPrice': [value: number | undefined]
  'update:minRating': [value: number | undefined]
  'update:sort': [value: ProfessionalSort | undefined]
  'geoAllow': []
}
