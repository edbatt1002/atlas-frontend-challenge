<script setup lang="ts">
import type { AppCarouselEmits, AppCarouselProps } from './types'
import { CAROUSEL_TRANSITION_SPEED_MS } from './config'
import { getActiveIndexFromSlideChange } from './utils'
import type { SwiperSlideChangeDetail } from './utils'

type SwiperContainerElement = HTMLElement & {
  swiper?: { slideTo: (index: number, speed?: number) => void }
}

const props = withDefaults(defineProps<AppCarouselProps>(), {
  modelValue: 0,
  pagination: false
})
const emit = defineEmits<AppCarouselEmits>()

const containerRef = ref<SwiperContainerElement | null>(null)

function onSlideChange(event: CustomEvent<SwiperSlideChangeDetail[]>) {
  const index = getActiveIndexFromSlideChange(event.detail)
  if (index != null) emit('update:modelValue', index)
}

watch(() => props.modelValue, (index) => {
  containerRef.value?.swiper?.slideTo(index, CAROUSEL_TRANSITION_SPEED_MS)
})
</script>

<template>
  <swiper-container
    ref="containerRef"
    :speed="CAROUSEL_TRANSITION_SPEED_MS"
    :pagination="pagination"
    :initial-slide="modelValue"
    @swiperslidechange="onSlideChange"
  >
    <slot />
  </swiper-container>
</template>
