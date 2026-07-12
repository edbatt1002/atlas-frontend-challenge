import type { ProfessionalLocation } from '../../../types'

export interface IdentityHeaderProps {
  avatarUrl: string
  name: string
  profession: string
  verified: boolean
  online: boolean
  rating: number
  reviewsCount: number
  location: ProfessionalLocation
}
