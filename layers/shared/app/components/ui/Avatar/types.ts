export type AvatarSize = 'sm' | 'md' | 'lg' | 'hero'

export interface AvatarProps {
  src?: string
  alt: string
  size?: AvatarSize
  online?: boolean
}
