<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import type { ProfessionalCardData } from '../types'
import { CAROUSEL_LAZY_PRELOAD_NEIGHBORS } from '../config'

const { professional, photos, priority = false, engaged = true } = defineProps<{
  professional: ProfessionalCardData
  photos: string[]
  priority?: boolean
  engaged?: boolean
}>()

const activeIndex = defineModel<number>({ required: true })
const emit = defineEmits<{ ready: [] }>()
const profileTo = computed(() => professionalPath(professional.id, professional.name))
const loadedPhotoIndexes = ref(new Set<number>())
let readyEmitted = false

function emitReady() {
  if (readyEmitted) return
  readyEmitted = true
  emit('ready')
}

watch(activeIndex, (index) => {
  const next = new Set(loadedPhotoIndexes.value)
  const lastPhotoIndex = photos.length - 1

  for (let candidate = index - 1; candidate <= index + CAROUSEL_LAZY_PRELOAD_NEIGHBORS; candidate++) {
    if (candidate >= 0 && candidate <= lastPhotoIndex) next.add(candidate)
  }

  loadedPhotoIndexes.value = next
}, { immediate: true })
</script>

<template>
  <UiCarousel
    v-model="activeIndex"
    :slide-count="photos.length + 1"
    :lazy-preload-prev-next="CAROUSEL_LAZY_PRELOAD_NEIGHBORS"
    navigation
    class="absolute inset-0 size-full"
  >
    <SwiperSlide
      v-for="(photo, index) in photos"
      :key="photo"
    >
      <NuxtImg
        v-if="engaged && loadedPhotoIndexes.has(index)"
        :src="photo"
        :alt="`${professional.name} - foto ${index + 1}`"
        :loading="index === 0 && priority ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 && priority ? 'high' : undefined"
        width="640"
        height="800"
        densities="1"
        class="size-full object-cover"
        @load="index === 0 && emitReady()"
        @error="index === 0 && emitReady()"
      />
    </SwiperSlide>

    <SwiperSlide>
      <div class="relative flex size-full flex-col items-center justify-center gap-1 overflow-hidden p-5 text-center">
        <NuxtImg
          v-if="engaged && photos[0]"
          :src="photos[0]"
          aria-hidden="true"
          loading="lazy"
          width="640"
          height="800"
          densities="1"
          class="absolute inset-0 size-full scale-110 object-cover opacity-80 blur-xs"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-bg-raised/40 to-bg-soft/60 dark:from-bg-raised/85 dark:to-bg-soft/95" />

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
          class="relative mt-3.5 rounded-[11px] bg-primary-600 px-5 py-2.5 text-xs font-extrabold text-white"
        >
          Entrar no perfil →
        </NuxtLink>
      </div>
    </SwiperSlide>
  </UiCarousel>
</template>
