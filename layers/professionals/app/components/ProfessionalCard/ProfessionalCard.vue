<script setup lang="ts">
import type { ProfessionalCardProps } from './types'
import { CARD_MAX_PHOTOS } from './config'
import { getCardPhotos, getSegmentState } from './utils'

const { professional, priority = false } = defineProps<ProfessionalCardProps>()

const photos = computed(() => getCardPhotos(professional.gallery, CARD_MAX_PHOTOS))
const slideCount = computed(() => photos.value.length + 1)
const activeIndex = ref(0)
const carouselActive = ref(false)
const carouselReady = ref(false)
const carouselEngaged = ref(false)
const nextSlideRequested = ref(false)
const cardEl = ref<HTMLElement | null>(null)
const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
const isPhotoSlide = computed(() => activeIndex.value < photos.value.length)
const carouselVisible = computed(() => carouselReady.value && carouselEngaged.value)

const profileTo = computed(() => professionalPath(professional.id, professional.name))

let stopCarouselObserver: () => void = () => {}
function activateCarousel() {
  carouselActive.value = true
  stopCarouselObserver()
}

function requestNextSlide() {
  nextSlideRequested.value = true
  carouselEngaged.value = true
  activateCarousel()
}

function engageCarousel() {
  carouselEngaged.value = true
  activateCarousel()
}

watch(carouselReady, async (ready) => {
  if (!ready || !nextSlideRequested.value) return
  nextSlideRequested.value = false
  await nextTick()
  activeIndex.value = 1
})

const carouselObserver = useIntersectionObserver(
  cardEl,
  ([entry]) => {
    if (!entry?.isIntersecting || canHover.value) return
    activateCarousel()
  },
  { rootMargin: '0px' }
)
stopCarouselObserver = carouselObserver.stop
</script>

<template>
  <article
    ref="cardEl"
    class="group relative overflow-hidden rounded-[12px] border border-line bg-bg-card shadow-card transition duration-200 [content-visibility:auto] [contain-intrinsic-size:auto_590px] hover:border-primary-400/40"
    @pointerenter="canHover && engageCarousel()"
    @pointerdown="engageCarousel"
    @focusin="engageCarousel"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-bg-raised">
      <LazyProfessionalCardCarousel
        v-if="carouselActive"
        v-model="activeIndex"
        :professional="professional"
        :photos="photos"
        :priority="priority"
        :engaged="carouselEngaged"
        @ready="carouselReady = true"
      />

      <div
        v-if="!carouselVisible && photos[0]"
        class="pointer-events-none absolute inset-0 z-10"
      >
        <NuxtImg
          :src="photos[0]"
          :alt="`${professional.name} - foto 1`"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : undefined"
          width="640"
          height="800"
          densities="1"
          class="size-full object-cover"
        />

        <UButton
          v-if="photos.length > 1"
          aria-label="Próximo slide"
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="soft"
          size="sm"
          class="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 text-white hover:bg-black/65"
          @click="requestNextSlide"
        />
      </div>

      <template v-if="isPhotoSlide">
        <div class="pointer-events-none absolute inset-x-2 top-2 z-20 flex gap-1">
          <span
            v-for="n in slideCount"
            :key="n"
            class="h-[3px] flex-1 rounded-full transition-colors"
            :class="{
              'bg-white': getSegmentState(n - 1, activeIndex) === 'active',
              'bg-white/75': getSegmentState(n - 1, activeIndex) === 'passed',
              'bg-white/30': getSegmentState(n - 1, activeIndex) === 'upcoming'
            }"
          />
        </div>

        <ProfessionalOnlineBadge
          v-if="professional.online"
          variant="overlay"
          label="ONLINE"
          class="pointer-events-none absolute left-2 top-[18px] z-20"
        />

        <UButton
          aria-label="Favoritar"
          icon="i-lucide-heart"
          color="neutral"
          variant="soft"
          size="sm"
          class="absolute right-2.5 top-4 z-20 rounded-full border border-white/20 bg-black/45 text-primary-400"
        />

        <span class="pointer-events-none absolute bottom-2 right-2 z-20 rounded-full bg-primary-600 px-2.5 py-1 text-xs font-extrabold text-white">
          {{ formatCurrency(professional.price) }}
        </span>
        <UiRatingStar
          :value="professional.rating"
          class="pointer-events-none absolute bottom-2 left-2 z-20 rounded-full bg-black/70 px-2 py-0.5 text-xs font-bold text-white [--color-star:#ffd166]"
        />
      </template>
    </div>

    <NuxtLink
      :to="profileTo"
      class="block p-3"
    >
      <div class="flex min-w-0 items-center gap-1.5">
        <h3 class="truncate font-display text-sm font-bold text-ink">
          {{ professional.name }}
        </h3>
        <UiVerifiedBadge
          v-if="professional.verified"
          size="sm"
        />
      </div>
      <p class="mt-0.5 truncate text-xs font-semibold text-primary-400">
        {{ professional.profession }}
      </p>
      <p class="mt-1 truncate text-xs text-ink-muted">
        {{ professional.description }}
      </p>
      <p class="mt-1.5 truncate text-[11px] text-ink-faint">
        {{ professional.location.city }} · {{ formatDistance(professional.location.distanceKm) }}
      </p>
    </NuxtLink>
  </article>
</template>
