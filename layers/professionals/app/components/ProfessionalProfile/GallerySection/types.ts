import type { ProfessionalMedia } from '../../../types'

export interface GallerySectionProps {
  media: ProfessionalMedia[]
  name: string
}

export interface GallerySectionEmits {
  open: [index: number]
}
