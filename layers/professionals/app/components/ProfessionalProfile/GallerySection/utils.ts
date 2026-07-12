import type { ProfessionalMedia } from '../../../types'

export interface GalleryDisplay {
  items: ProfessionalMedia[]
  extraCount: number
}

export function getGalleryDisplay(media: ProfessionalMedia[], limit: number): GalleryDisplay {
  if (media.length <= limit) return { items: media, extraCount: 0 }
  return { items: media.slice(0, limit), extraCount: media.length - limit }
}
