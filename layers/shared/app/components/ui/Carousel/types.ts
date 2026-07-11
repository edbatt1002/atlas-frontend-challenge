export interface CarouselProps {
  modelValue?: number
  slideCount: number
  pagination?: boolean
  navigation?: boolean
}

export interface CarouselEmits {
  'update:modelValue': [index: number]
}
