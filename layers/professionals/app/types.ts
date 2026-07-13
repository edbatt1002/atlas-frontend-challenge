export interface Profession {
  label: string
  slug: string
  icon: string
}

export interface CatalogSummary {
  total: number
  professions: Profession[]
  counts: Record<string, number>
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

export interface ProfessionalMedia {
  url: string
  type: 'photo' | 'video'
}

export interface ProfessionalCharacteristics {
  age: number
  heightCm: number
  weightKg: number
  footSize: number
  gender: string
  genderDescription: string
  genitals: string
  sexualPreference: string
  sexualPreferenceDescription: string
  ethnicity: string
  hairColor: string
  hairStyle: string
  hairLength: string
  eyeColor: string
  hasSilicone: boolean
  hasTattoos: boolean
  hasPiercings: boolean
  smoker: string
  attends: string
  hasLocal: boolean
  languages: string[]
  hours: string
}

export interface ProfessionalPriceTier {
  label: string
  price: number
}

export interface ProfessionalContact {
  telegram?: string
  whatsapp?: string
}

export interface ProfessionalStats {
  lastActivity: string
  responseTime: string
  memberSince: string
}

export interface Professional {
  id: string
  name: string
  profession: string
  professionSlug: string
  cover: string
  avatar: string
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
  media: ProfessionalMedia[]
  characteristics: ProfessionalCharacteristics
  priceTiers: ProfessionalPriceTier[]
  contact: ProfessionalContact
  stats: ProfessionalStats
  services: ProfessionalService[]
  availability: ProfessionalAvailability[]
  reviews: ProfessionalReview[]
}

export interface ProfessionalSummary {
  id: string
  name: string
  profession: string
  professionSlug: string
  gallery: string[]
  photos: number
  videos: number
  online: boolean
  verified: boolean
  price: number
  rating: number
  description: string
  location: Pick<ProfessionalLocation, 'city' | 'state' | 'distanceKm'>
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
  data: ProfessionalSummary[]
  meta: ProfessionalListMeta
}

export type CatalogSheetMode = 'filter' | 'sort' | 'geo'

export type CatalogFilterSection = 'profissao' | 'disponibilidade' | 'preco' | 'avaliacao'
