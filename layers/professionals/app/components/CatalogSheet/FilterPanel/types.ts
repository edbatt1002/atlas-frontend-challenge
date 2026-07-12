import type { Profession } from '../../../types'

export interface FilterPanelProps {
  professions: Profession[]
}

export interface FilterPanelEmits {
  close: []
}
