export interface SwiperSlideChangeDetail {
  activeIndex: number
}

export function getActiveIndexFromSlideChange(detail: SwiperSlideChangeDetail[] | undefined): number | undefined {
  return detail?.[0]?.activeIndex
}

export function getPrevCarouselIndex(current: number): number {
  return Math.max(current - 1, 0)
}

export function getNextCarouselIndex(current: number, slideCount: number): number {
  return Math.min(current + 1, slideCount - 1)
}
