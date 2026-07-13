import type { ProfileSectionId } from './ProfileTabs/config'

export function pickMostVisibleSection(
  ratios: Partial<Record<ProfileSectionId, number>>
): ProfileSectionId | undefined {
  let best: ProfileSectionId | undefined
  let bestRatio = 0

  for (const [id, ratio] of Object.entries(ratios) as [ProfileSectionId, number][]) {
    if (ratio > bestRatio) {
      best = id
      bestRatio = ratio
    }
  }

  return best
}
