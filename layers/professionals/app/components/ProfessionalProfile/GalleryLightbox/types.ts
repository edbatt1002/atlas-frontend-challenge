import type { ProfessionalMedia } from '../../../types'

export interface GalleryLightboxProps {
  open: boolean
  media: ProfessionalMedia[]
  initialIndex?: number
  name: string
}

export interface GalleryLightboxEmits {
  close: []
}
