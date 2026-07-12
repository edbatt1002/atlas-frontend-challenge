<script setup lang="ts">
import type { ProfessionalCardProps } from './types'
import { CARD_MAX_PHOTOS, CAROUSEL_LAZY_PRELOAD_NEIGHBORS } from './config'
import { getCardPhotos, getSegmentState } from './utils'

const { professional } = defineProps<ProfessionalCardProps>()

const photos = computed(() => getCardPhotos(professional.gallery, CARD_MAX_PHOTOS))
const slideCount = computed(() => photos.value.length + 1)
const activeIndex = ref(0)
const isPhotoSlide = computed(() => activeIndex.value < photos.value.length)

const profileTo = computed(() => professionalPath(professional.id, professional.name))
</script>

<template>
  <article class="group relative overflow-hidden rounded-[12px] border border-line bg-bg-card shadow-card transition duration-200 hover:border-primary-400/40">
    <div class="relative aspect-[4/5] overflow-hidden bg-bg-raised">
      <UiCarousel
        v-model="activeIndex"
        :slide-count="slideCount"
        :lazy-preload-prev-next="CAROUSEL_LAZY_PRELOAD_NEIGHBORS"
        navigation
        class="absolute inset-0 size-full"
      >
        <UiCarouselSlide
          v-for="(photo, index) in photos"
          :key="photo"
        >
          <img
            :src="photo"
            :alt="`${professional.name} - foto ${index + 1}`"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 && priority ? 'high' : undefined"
            class="size-full object-cover"
          >
        </UiCarouselSlide>

        <UiCarouselSlide>
          <div class="relative flex size-full flex-col items-center justify-center gap-1 overflow-hidden p-5 text-center">
            <img
              v-if="photos[0]"
              :src="photos[0]"
              aria-hidden="true"
              loading="lazy"
              class="absolute inset-0 size-full scale-110 object-cover opacity-80 blur-xs"
            >
            <div class="absolute inset-0 bg-gradient-to-br from-bg-raised/85 to-bg-soft/95" />

            <p class="relative font-display text-base font-extrabold text-ink">
              Perfil de {{ professional.name }}
            </p>
            <p class="relative mt-1 max-w-[24ch] text-xs text-ink-muted">
              Tem muito mais te esperando lá dentro
            </p>
            <div class="relative mt-4 flex gap-2.5">
              <div class="rounded-[11px] border border-line bg-white/5 px-3.5 py-2.5 text-center">
                <div class="font-display text-xl font-extrabold text-primary-400">
                  {{ professional.photos }}
                </div>
                <div class="text-[10px] font-semibold text-ink-faint">
                  fotos
                </div>
              </div>
              <div class="rounded-[11px] border border-line bg-white/5 px-3.5 py-2.5 text-center">
                <div class="font-display text-xl font-extrabold text-primary-400">
                  {{ professional.videos }}
                </div>
                <div class="text-[10px] font-semibold text-ink-faint">
                  vídeos
                </div>
              </div>
            </div>
            <NuxtLink
              :to="profileTo"
              class="relative mt-3.5 rounded-[11px] bg-primary px-5 py-2.5 text-xs font-extrabold text-white"
            >
              Entrar no perfil →
            </NuxtLink>
          </div>
        </UiCarouselSlide>
      </UiCarousel>

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

        <span class="pointer-events-none absolute bottom-2 right-2 z-20 rounded-full bg-primary px-2.5 py-1 text-xs font-extrabold text-white">
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
