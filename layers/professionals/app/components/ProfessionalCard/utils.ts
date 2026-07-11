import { CARD_MAX_PHOTOS } from './config'

export function getCardPhotos(gallery: string[], max: number = CARD_MAX_PHOTOS): string[] {
  return gallery.slice(0, max)
}

export type CarouselSegmentState = 'active' | 'passed' | 'upcoming'

export function getSegmentState(index: number, activeIndex: number): CarouselSegmentState {
  if (index === activeIndex) return 'active'
  return index < activeIndex ? 'passed' : 'upcoming'
}
