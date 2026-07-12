<script setup lang="ts">
import { FEATURED_LIMIT } from './config'

const { data } = useFeaturedProfessionals(FEATURED_LIMIT)
</script>

<template>
  <div
    v-if="data && data.length > 0"
    class="py-8"
  >
    <div class="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
      <h2 class="font-display text-lg font-bold text-ink">
        Em destaque hoje
      </h2>
      <NuxtLink
        to="/buscar"
        class="text-xs font-bold text-primary-400"
      >
        Ver listagem →
      </NuxtLink>
    </div>

    <div class="mt-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:px-6">
      <ProfessionalCard
        v-for="professional in data"
        :key="professional.id"
        :professional="professional"
        class="w-[220px] shrink-0"
      />
    </div>
  </div>
</template>
