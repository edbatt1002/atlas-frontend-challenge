<script setup lang="ts">
import type { CarouselEmits, CarouselProps } from './types'
import { CAROUSEL_TRANSITION_SPEED_MS } from './config'
import { getActiveIndexFromSlideChange, getNextCarouselIndex, getPrevCarouselIndex } from './utils'
import type { SwiperSlideChangeDetail } from './utils'

type SwiperContainerElement = HTMLElement & {
  swiper?: { slideTo: (index: number, speed?: number) => void }
}

const props = withDefaults(defineProps<CarouselProps>(), {
  modelValue: 0,
  pagination: false,
  navigation: false
})
const emit = defineEmits<CarouselEmits>()

const containerRef = ref<SwiperContainerElement | null>(null)

function onSlideChange(event: CustomEvent<SwiperSlideChangeDetail[]>) {
  const index = getActiveIndexFromSlideChange(event.detail)
  if (index != null) emit('update:modelValue', index)
}

function goPrev() {
  emit('update:modelValue', getPrevCarouselIndex(props.modelValue))
}

function goNext() {
  emit('update:modelValue', getNextCarouselIndex(props.modelValue, props.slideCount))
}

watch(() => props.modelValue, (index) => {
  containerRef.value?.swiper?.slideTo(index, CAROUSEL_TRANSITION_SPEED_MS)
})
</script>

<template>
  <div class="relative size-full">
    <swiper-container
      ref="containerRef"
      :speed="CAROUSEL_TRANSITION_SPEED_MS"
      :pagination="pagination"
      :initial-slide="modelValue"
      class="size-full"
      @swiperslidechange="onSlideChange"
    >
      <slot />
    </swiper-container>

    <template v-if="navigation">
      <UButton
        v-if="modelValue > 0"
        aria-label="Slide anterior"
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="soft"
        size="sm"
        class="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 text-white hover:bg-black/65"
        @click="goPrev"
      />

      <UButton
        v-if="modelValue < slideCount - 1"
        aria-label="Próximo slide"
        icon="i-lucide-chevron-right"
        color="neutral"
        variant="soft"
        size="sm"
        class="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 text-white hover:bg-black/65"
        @click="goNext"
      />
    </template>
  </div>
</template>
