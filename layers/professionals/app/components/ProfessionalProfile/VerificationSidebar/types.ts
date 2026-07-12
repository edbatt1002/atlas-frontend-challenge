import type { ProfessionalContact, ProfessionalPriceTier, ProfessionalStats } from '../../../types'

export interface VerificationSidebarProps {
  basePrice: number
  priceTiers: ProfessionalPriceTier[]
  contact: ProfessionalContact
  verified: boolean
  stats: ProfessionalStats
}
