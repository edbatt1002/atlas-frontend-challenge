import type { Professional } from '../../types'

export type ProfessionalCardData = Pick<
  Professional,
  | 'id'
  | 'name'
  | 'profession'
  | 'gallery'
  | 'photos'
  | 'videos'
  | 'online'
  | 'verified'
  | 'price'
  | 'rating'
  | 'description'
  | 'location'
>

export interface ProfessionalCardProps {
  professional: ProfessionalCardData
  priority?: boolean
}
