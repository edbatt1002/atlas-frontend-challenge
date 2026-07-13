<script setup lang="ts">
import type { GalleryLightboxEmits, GalleryLightboxProps } from './types'
import { TYPE_FILTERS } from './config'
import type { MediaTypeFilter } from './config'
import { clampIndex, filterMediaByType } from './utils'

const { open, media, initialIndex } = defineProps<GalleryLightboxProps>()
const emit = defineEmits<GalleryLightboxEmits>()

const view = ref<'grid' | 'feed'>('grid')
const typeFilter = ref<MediaTypeFilter>('all')
const activeIndex = ref(0)

const filteredMedia = computed(() => filterMediaByType(media, typeFilter.value))

watch(() => open, (isOpen) => {
  if (!isOpen) return
  typeFilter.value = 'all'
  activeIndex.value = clampIndex(initialIndex ?? 0, media.length)
  view.value = 'grid'
})

function onSelectType(type: MediaTypeFilter) {
  typeFilter.value = type
  activeIndex.value = clampIndex(activeIndex.value, filteredMedia.value.length)
}

function openFeedAt(index: number) {
  activeIndex.value = index
  view.value = 'feed'
}

function setView(next: 'grid' | 'feed') {
  view.value = next
}

const loadedIndexes = ref(new Set([0]))
watch(activeIndex, (index) => {
  loadedIndexes.value.add(index)
})

const feedRefs = ref<HTMLElement[]>([])
watch(view, (v) => {
  if (v !== 'feed') return
  nextTick(() => {
    feedRefs.value[activeIndex.value]?.scrollIntoView({ block: 'start' })
  })
})

function setFeedRef(index: number) {
  return (el: unknown) => {
    if (el) feedRefs.value[index] = el as HTMLElement
  }
}

const feedContainerRef = ref<HTMLElement | null>(null)
useIntersectionObserver(
  feedRefs,
  (entries) => {
    const visible = entries.find(entry => entry.isIntersecting)
    if (!visible) return
    const index = feedRefs.value.indexOf(visible.target as HTMLElement)
    if (index !== -1) activeIndex.value = index
  },
  { root: feedContainerRef, threshold: 0.6 }
)
</script>

<template>
  <UModal
    :open="open"
    fullscreen
    :close="false"
    :ui="{ content: 'bg-bg' }"
    @update:open="(value: boolean) => { if (!value) emit('close') }"
  >
    <template #content>
      <div class="flex size-full flex-col">
        <div class="flex items-center justify-between border-b border-line px-4 py-3">
          <span class="font-display text-sm font-bold text-ink">Galeria</span>
          <div class="flex items-center gap-3">
            <span class="text-xs text-ink-muted">{{ media.length }} mídias</span>
            <UButton
              aria-label="Fechar"
              icon="i-lucide-x"
              color="neutral"
              variant="outline"
              size="sm"
              class="rounded-full"
              @click="emit('close')"
            />
          </div>
        </div>

        <div class="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
          <div class="flex gap-2">
            <UButton
              v-for="filter in TYPE_FILTERS"
              :key="filter.value"
              :label="filter.label"
              size="sm"
              color="neutral"
              :variant="typeFilter === filter.value ? 'solid' : 'outline'"
              class="rounded-full font-semibold"
              :class="typeFilter === filter.value ? 'bg-primary-600 text-white hover:bg-primary-600/90' : ''"
              @click="onSelectType(filter.value)"
            />
          </div>
          <div class="flex gap-1">
            <UButton
              aria-label="Grade"
              icon="i-lucide-grid-2x2"
              size="sm"
              :color="view === 'grid' ? 'primary' : 'neutral'"
              :variant="view === 'grid' ? 'solid' : 'outline'"
              @click="setView('grid')"
            />
            <UButton
              aria-label="Feed"
              icon="i-lucide-rows-3"
              size="sm"
              :color="view === 'feed' ? 'primary' : 'neutral'"
              :variant="view === 'feed' ? 'solid' : 'outline'"
              @click="setView('feed')"
            />
          </div>
        </div>

        <div
          v-if="view === 'grid'"
          class="flex-1 overflow-y-auto overscroll-contain p-3"
        >
          <div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
            <button
              v-for="(item, index) in filteredMedia"
              :key="item.url"
              type="button"
              class="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-bg-raised"
              @click="openFeedAt(index)"
            >
              <NuxtImg
                :src="item.url"
                :alt="`${name} - mídia ${index + 1}`"
                loading="lazy"
                width="400"
                height="533"
                densities="1"
                class="size-full object-cover"
              />
              <span
                v-if="item.type === 'video'"
                class="absolute inset-0 flex items-center justify-center bg-black/25 text-xl text-white"
                aria-hidden="true"
              >▶</span>
            </button>
          </div>
        </div>

        <div
          v-else
          ref="feedContainerRef"
          class="relative flex-1 snap-y snap-mandatory overflow-y-auto"
        >
          <div
            v-for="(item, index) in filteredMedia"
            :key="item.url"
            :ref="setFeedRef(index)"
            class="relative flex h-full w-full snap-start items-center justify-center bg-black"
          >
            <NuxtImg
              v-if="loadedIndexes.has(index)"
              :src="item.url"
              :alt="`${name} - mídia ${index + 1}`"
              :loading="index === 0 ? 'eager' : 'lazy'"
              width="960"
              height="720"
              densities="1"
              class="max-h-full max-w-full object-contain"
            />
            <span
              v-if="item.type === 'video'"
              class="absolute inset-0 flex items-center justify-center text-4xl text-white"
              aria-hidden="true"
            >▶</span>
          </div>

          <span class="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
            {{ activeIndex + 1 }}/{{ filteredMedia.length }}
          </span>
        </div>
      </div>
    </template>
  </UModal>
</template>
