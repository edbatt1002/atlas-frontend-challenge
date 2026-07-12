export interface Profession {
  label: string
  slug: string
  icon: string
}

export interface ProfessionalService {
  name: string
  price: number
}

export interface ProfessionalReview {
  author: string
  rating: number
  comment: string
  date: string
}

export interface ProfessionalAvailability {
  day: string
  slots: string[]
}

export interface ProfessionalLocation {
  city: string
  state: string
  distanceKm: number
}

export interface Professional {
  id: string
  name: string
  profession: string
  professionSlug: string
  photo: string
  price: number
  rating: number
  reviewsCount: number
  online: boolean
  verified: boolean
  photos: number
  videos: number
  createdAt: string
  description: string
  location: ProfessionalLocation
  gallery: string[]
  services: ProfessionalService[]
  availability: ProfessionalAvailability[]
  reviews: ProfessionalReview[]
}

export type ProfessionalSort
  = | 'featured'
    | 'newest'
    | 'nearest'
    | 'rating'
    | 'price'

export interface ProfessionalListParams {
  search?: string
  profession?: string
  state?: string
  online?: boolean
  min_price?: number
  max_price?: number
  min_rating?: number
  sort?: ProfessionalSort
  page?: number
  limit?: number
}

export interface ProfessionalListMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ProfessionalListResponse {
  data: Professional[]
  meta: ProfessionalListMeta
}

export type CatalogSheetMode = 'filter' | 'sort' | 'geo'

export type CatalogFilterSection = 'profissao' | 'disponibilidade' | 'preco' | 'avaliacao'
