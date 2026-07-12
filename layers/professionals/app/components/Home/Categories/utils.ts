import type { Profession } from '../../../types'

export function pickCategories(professions: Profession[], slugs: string[]): Profession[] {
  return slugs
    .map(slug => professions.find(p => p.slug === slug))
    .filter((p): p is Profession => p !== undefined)
}
