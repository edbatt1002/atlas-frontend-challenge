import type { ProfessionalMedia } from '../../../types'
import type { MediaTypeFilter } from './config'

export function filterMediaByType(media: ProfessionalMedia[], type: MediaTypeFilter): ProfessionalMedia[] {
  if (type === 'all') return media
  return media.filter(item => item.type === type)
}

export function clampIndex(index: number, length: number): number {
  if (length === 0) return 0
  return Math.min(Math.max(index, 0), length - 1)
}
