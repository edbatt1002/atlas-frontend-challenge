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
  description: string
  location: ProfessionalLocation
  gallery: string[]
  services: ProfessionalService[]
  availability: ProfessionalAvailability[]
  reviews: ProfessionalReview[]
}

export type ProfessionalSort
  = | 'price_asc'
    | 'price_desc'
    | 'rating_desc'
    | 'distance_asc'
    | 'name_asc'

export interface ProfessionalListParams {
  search?: string
  profession?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
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
