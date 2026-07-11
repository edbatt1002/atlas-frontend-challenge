import type { CatalogFilterSection } from '../../types'

export interface CatalogFilterSectionsProps {
  sections: { id: CatalogFilterSection, label: string, count: number }[]
  active: CatalogFilterSection
}

export interface CatalogFilterSectionsEmits {
  select: [id: CatalogFilterSection]
}
