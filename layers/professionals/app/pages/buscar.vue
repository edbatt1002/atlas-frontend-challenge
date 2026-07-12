<script setup lang="ts">
import type { CatalogSheetMode } from '../types'

useCatalogChrome()

const toolbarHeight = useCatalogToolbarHeight()

const { filters, query, activeFilterCount, reset } = useProfessionalFilters()
const { data: professions } = useProfessions()

const sheetMode = ref<CatalogSheetMode | null>(null)

function openSheet(mode: CatalogSheetMode) {
  sheetMode.value = mode
}

function closeSheet() {
  sheetMode.value = null
}
</script>

<template>
  <div>
    <CatalogToolbar
      v-model:search="filters.search"
      :filter-count="activeFilterCount"
      @open="openSheet"
    />

    <UContainer
      class="pb-6 sm:pb-8"
      :style="{ paddingTop: `${toolbarHeight + 24}px` }"
    >
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
        Catálogo
      </div>
      <h1 class="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Encontre quem combina com você
      </h1>
      <p class="mt-2 max-w-xl text-sm text-ink-muted">
        Perfis verificados, avaliações e disponibilidade em tempo real na sua cidade.
      </p>

      <ProfessionalsCatalog
        :query="query"
        class="mt-6"
        @clear="reset"
      />
    </UContainer>

    <CatalogSheet
      :mode="sheetMode"
      :professions="professions ?? []"
      :profession="filters.profession"
      :online="filters.online"
      :max-price="filters.maxPrice"
      :min-rating="filters.minRating"
      :sort="filters.sort"
      @close="closeSheet"
      @clear="reset"
      @update:profession="filters.profession = $event"
      @update:online="filters.online = $event"
      @update:max-price="filters.maxPrice = $event"
      @update:min-rating="filters.minRating = $event"
      @update:sort="filters.sort = $event"
    />
  </div>
</template>
