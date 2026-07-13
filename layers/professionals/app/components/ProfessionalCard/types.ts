import type { ProfessionalSummary } from '../../types'

export type ProfessionalCardData = ProfessionalSummary

export interface ProfessionalCardProps {
  professional: ProfessionalCardData
  priority?: boolean
}
