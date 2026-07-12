import type { AvatarSize } from './types'

interface AvatarSizeClasses {
  container: string
  text: string
  dot: string
}

export const AVATAR_SIZES: Record<AvatarSize, AvatarSizeClasses> = {
  sm: {
    container: 'size-16 border-2',
    text: 'text-lg',
    dot: 'size-3.5 border-2 right-0 bottom-0'
  },
  md: {
    container: 'size-20 border-4',
    text: 'text-xl',
    dot: 'size-4 border-[3px] right-0.5 bottom-0.5'
  },
  lg: {
    container: 'size-[100px] border-4',
    text: 'text-3xl',
    dot: 'size-[17px] border-[3px] right-[5px] bottom-[5px]'
  },
  hero: {
    container: 'size-[100px] border-4 lg:size-[150px] lg:border-[5px]',
    text: 'text-3xl lg:text-5xl',
    dot: 'size-[17px] border-[3px] right-[5px] bottom-[5px] lg:size-[22px] lg:border-4 lg:right-[9px] lg:bottom-[9px]'
  }
}

export const AVATAR_PIXEL_SIZES: Record<AvatarSize, number> = {
  sm: 64,
  md: 80,
  lg: 100,
  hero: 150
}
