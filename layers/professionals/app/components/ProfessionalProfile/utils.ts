export interface GalleryDisplay {
  photos: string[]
  extraCount: number
}

export function getGalleryDisplay(gallery: string[], limit: number): GalleryDisplay {
  if (gallery.length <= limit) return { photos: gallery, extraCount: 0 }
  return { photos: gallery.slice(0, limit), extraCount: gallery.length - limit }
}
