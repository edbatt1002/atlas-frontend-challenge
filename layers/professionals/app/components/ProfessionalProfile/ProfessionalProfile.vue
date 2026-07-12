<script setup lang="ts">
import type { ProfessionalProfileProps } from './types'
import { GALLERY_GRID_LIMIT } from './config'
import { getGalleryDisplay } from './utils'

const props = defineProps<ProfessionalProfileProps>()

const gallery = computed(() => getGalleryDisplay(props.professional.gallery, GALLERY_GRID_LIMIT))
</script>

<template>
  <div>
    <div class="relative aspect-square w-full overflow-hidden bg-bg-raised">
      <img
        :src="professional.photo"
        :alt="professional.name"
        loading="eager"
        fetchpriority="high"
        class="size-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/35" />

      <UButton
        to="/buscar"
        aria-label="Voltar ao catálogo"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="soft"
        size="lg"
        class="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 text-white"
      />

      <UButton
        aria-label="Favoritar"
        icon="i-lucide-heart"
        color="neutral"
        variant="soft"
        size="lg"
        class="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 text-primary-400"
      />

      <div class="absolute inset-x-4 bottom-4">
        <span
          v-if="professional.online"
          class="inline-flex items-center gap-1.5 rounded-full border border-online/40 bg-black/60 px-2.5 py-1 text-[11px] font-bold text-online"
        >
          <span class="size-1.5 rounded-full bg-online" />ONLINE AGORA
        </span>

        <div class="mt-2 flex items-center gap-2">
          <h1 class="font-display text-2xl font-extrabold text-white sm:text-3xl">
            {{ professional.name }}
          </h1>
          <span
            v-if="professional.verified"
            class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] text-white"
          >✓</span>
        </div>

        <div class="mt-1 flex items-center gap-2.5 text-sm font-semibold text-ink-muted">
          <span>{{ professional.profession }}</span>
          <span class="text-[#ffd166]">★ {{ professional.rating.toFixed(1) }} · {{ professional.reviewsCount }}</span>
          <span>{{ formatDistance(professional.location.distanceKm) }}</span>
        </div>
      </div>
    </div>

    <div class="px-4 pb-32 pt-5 sm:px-6">
      <span class="inline-flex items-center rounded-full border border-line bg-bg-soft px-3 py-1.5 text-[11px] font-semibold text-ink-muted">
        {{ professional.location.city }} · {{ professional.location.state }}
      </span>

      <h2 class="mt-6 font-display text-base font-bold text-ink">
        Sobre
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">
        {{ professional.description }}
      </p>

      <h2 class="mt-6 font-display text-base font-bold text-ink">
        Serviços
      </h2>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="service in professional.services"
          :key="service.name"
          class="rounded-[12px] border border-line bg-bg-soft px-3.5 py-2 text-[13px] font-semibold text-ink"
        >
          {{ service.name }} · {{ formatCurrency(service.price) }}
        </span>
      </div>

      <template v-if="gallery.photos.length > 0">
        <h2 class="mt-6 font-display text-base font-bold text-ink">
          Galeria
        </h2>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <div
            v-for="(photo, index) in gallery.photos"
            :key="photo"
            class="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-bg-raised"
          >
            <img
              :src="photo"
              :alt="`${professional.name} - galeria ${index + 1}`"
              loading="lazy"
              class="size-full object-cover"
            >
            <div
              v-if="index === gallery.photos.length - 1 && gallery.extraCount > 0"
              class="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-extrabold text-white"
            >
              +{{ gallery.extraCount }}
            </div>
          </div>
        </div>
      </template>

      <template v-if="professional.reviews.length > 0">
        <h2 class="mt-6 font-display text-base font-bold text-ink">
          Avaliações
        </h2>
        <div class="mt-2 flex flex-col gap-2.5">
          <div
            v-for="review in professional.reviews"
            :key="`${review.author}-${review.date}`"
            class="rounded-[14px] border border-line bg-bg-soft px-4 py-3.5"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-[13px] font-bold text-ink">{{ review.author }}</span>
              <span class="text-xs font-bold text-[#ffd166]">★ {{ review.rating.toFixed(1) }}</span>
            </div>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-ink-faint">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </template>
    </div>

    <div class="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-xl">
      <div>
        <div class="text-[10px] font-semibold text-ink-faint">
          A partir de
        </div>
        <div class="font-display text-lg font-extrabold text-ink">
          {{ formatCurrency(professional.price) }}
        </div>
      </div>
      <UButton
        block
        color="primary"
        size="xl"
        label="Enviar mensagem"
        class="flex-1 justify-center font-extrabold"
      />
    </div>
  </div>
</template>
