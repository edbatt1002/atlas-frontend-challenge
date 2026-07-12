export function getPrevCarouselIndex(current: number): number {
  return Math.max(current - 1, 0)
}

export function getNextCarouselIndex(current: number, slideCount: number): number {
  return Math.min(current + 1, slideCount - 1)
}
