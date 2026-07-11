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
      <button
        v-if="modelValue > 0"
        type="button"
        aria-label="Slide anterior"
        class="absolute left-2 top-1/2 z-30 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65"
        @click="goPrev"
      >
        <UIcon
          name="i-lucide-chevron-left"
          class="size-4"
        />
      </button>

      <button
        v-if="modelValue < slideCount - 1"
        type="button"
        aria-label="Próximo slide"
        class="absolute right-2 top-1/2 z-30 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65"
        @click="goNext"
      >
        <UIcon
          name="i-lucide-chevron-right"
          class="size-4"
        />
      </button>
    </template>
  </div>
</template>
