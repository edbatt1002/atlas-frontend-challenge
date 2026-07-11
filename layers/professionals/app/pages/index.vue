<script setup lang="ts">
const { filters, query, reset } = useProfessionalFilters()
const { data: professions } = useProfessions()
</script>

<template>
  <UContainer class="py-6 sm:py-8">
    <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
      Catálogo
    </div>
    <h1 class="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
      Encontre quem combina com você
    </h1>
    <p class="mt-2 max-w-xl text-sm text-ink-muted">
      Perfis verificados, avaliações e disponibilidade em tempo real na sua cidade.
    </p>

    <FiltersPanel
      v-model:search="filters.search"
      v-model:profession="filters.profession"
      v-model:min-price="filters.minPrice"
      v-model:max-price="filters.maxPrice"
      v-model:sort="filters.sort"
      :professions="professions ?? []"
      class="mt-6"
      @clear="reset"
    />

    <ProfessionalsCatalog
      :query="query"
      class="mt-6"
      @clear="reset"
    />
  </UContainer>
</template>
