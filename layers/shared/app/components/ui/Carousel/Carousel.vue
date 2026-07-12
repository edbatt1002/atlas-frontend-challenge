<script setup lang="ts">
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import type { CarouselProps } from './types'
import { CAROUSEL_TRANSITION_SPEED_MS } from './config'
import { getNextCarouselIndex, getPrevCarouselIndex } from './utils'

const modelValue = defineModel<number>({ default: 0 })
const { slideCount, navigation = false, lazyPreloadPrevNext = 0 } = defineProps<CarouselProps>()
const modules = [A11y, Keyboard]
const swiper = shallowRef<SwiperInstance | null>(null)

function onSwiper(instance: SwiperInstance) {
  swiper.value = instance
}

function onSlideChange(instance: SwiperInstance) {
  modelValue.value = instance.activeIndex
}

function goPrev() {
  const index = getPrevCarouselIndex(modelValue.value)
  modelValue.value = index
  swiper.value?.slideTo(index)
}

function goNext() {
  const index = getNextCarouselIndex(modelValue.value, slideCount)
  modelValue.value = index
  swiper.value?.slideTo(index)
}

watch(modelValue, index => swiper.value?.slideTo(index))
</script>

<template>
  <div class="relative size-full overflow-hidden">
    <Swiper
      data-testid="carousel-track"
      :modules="modules"
      :initial-slide="modelValue"
      :speed="CAROUSEL_TRANSITION_SPEED_MS"
      :lazy-preload-prev-next="lazyPreloadPrevNext"
      :keyboard="{ enabled: true }"
      class="size-full"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <slot />
    </Swiper>

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
