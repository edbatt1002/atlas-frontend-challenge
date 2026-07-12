import type { ProfileSectionId } from './config'

export interface ProfileTabsProps {
  active: ProfileSectionId
  topOffset: number
}

export interface ProfileTabsEmits {
  select: [id: ProfileSectionId]
}
