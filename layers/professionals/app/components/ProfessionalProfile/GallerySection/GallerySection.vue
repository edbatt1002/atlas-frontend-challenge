<script setup lang="ts">
import type { GallerySectionProps } from './types'
import { GALLERY_GRID_LIMIT } from './config'
import { getGalleryDisplay } from './utils'

const props = defineProps<GallerySectionProps>()

const gallery = computed(() => getGalleryDisplay(props.media, GALLERY_GRID_LIMIT))
</script>

<template>
  <div v-if="gallery.items.length > 0">
    <div class="flex items-center justify-between">
      <h2 class="font-display text-base font-bold text-ink">
        Galeria · {{ media.length }} mídias
      </h2>
    </div>

    <div class="mt-2 grid grid-cols-3 gap-2">
      <div
        v-for="(item, index) in gallery.items"
        :key="item.url"
        class="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-bg-raised"
      >
        <img
          :src="item.url"
          :alt="`${name} - galeria ${index + 1}`"
          loading="lazy"
          class="size-full object-cover"
        >
        <span
          v-if="item.type === 'video'"
          class="absolute inset-0 flex items-center justify-center bg-black/25 text-2xl text-white"
          aria-hidden="true"
        >▶</span>
        <div
          v-if="index === gallery.items.length - 1 && gallery.extraCount > 0"
          class="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-extrabold text-white"
        >
          +{{ gallery.extraCount }}
        </div>
      </div>
    </div>
  </div>
</template>
