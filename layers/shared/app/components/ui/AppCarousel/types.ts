export interface AppCarouselProps {
  modelValue?: number
  pagination?: boolean
}

export interface AppCarouselEmits {
  'update:modelValue': [index: number]
}
