export interface SwiperSlideChangeDetail {
  activeIndex: number
}

export function getActiveIndexFromSlideChange(detail: SwiperSlideChangeDetail[] | undefined): number | undefined {
  return detail?.[0]?.activeIndex
}
