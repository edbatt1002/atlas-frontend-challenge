<script setup lang="ts">
import type { FeaturedStripProps } from './types'

defineProps<FeaturedStripProps>()
</script>

<template>
  <div class="py-8 px-4 sm:px-6">
    <div class="mx-auto max-w-4xl">
      <div class="flex items-center justify-between">
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

      <div class="mt-4 flex gap-3 overflow-x-auto pb-2">
        <ProfessionalCard
          v-for="professional in professionals"
          :key="professional.id"
          :professional="professional"
          class="w-[220px] shrink-0"
        />
        <ProfessionalCardSkeleton
          v-for="index in professionals.length === 0 ? 4 : 0"
          :key="`featured-placeholder-${index}`"
          aria-hidden="true"
          class="w-[220px] shrink-0"
        />
      </div>
    </div>
  </div>
</template>
