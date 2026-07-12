<script setup lang="ts">
import type { CatalogSheetMode } from '../types'

useCatalogChrome()

const toolbarHeight = useCatalogToolbarHeight()

const { filters, query, activeFilterCount, reset } = useProfessionalFilters()
const { data: professions } = useProfessions()

usePageSeo({
  title: 'Buscar profissionais',
  description: 'Filtre por profissão, preço, avaliação e distância para encontrar quem combina com você.'
})

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
      v-model:profession="filters.profession"
      v-model:online="filters.online"
      v-model:max-price="filters.maxPrice"
      v-model:min-rating="filters.minRating"
      v-model:sort="filters.sort"
      :mode="sheetMode"
      :professions="professions ?? []"
      @close="closeSheet"
      @clear="reset"
    />
  </div>
</template>
