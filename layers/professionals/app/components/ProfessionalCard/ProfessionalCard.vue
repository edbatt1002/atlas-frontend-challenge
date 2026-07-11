<script setup lang="ts">
import type { ProfessionalCardProps } from './types'

defineProps<ProfessionalCardProps>()
</script>

<template>
  <ULink
    :to="`/professionals/${professional.id}`"
    class="group block"
  >
    <article class="overflow-hidden rounded-2xl border border-line bg-bg-card shadow-card transition duration-200 group-hover:border-primary-400/40">
      <div class="relative aspect-[4/5] bg-bg-raised">
        <img
          :src="professional.photo"
          :alt="professional.name"
          loading="lazy"
          class="size-full object-cover"
        >
        <span
          v-if="professional.online"
          class="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-online/40 bg-black/70 px-2 py-0.5 text-[9px] font-bold text-online"
        >
          <span class="size-1.5 rounded-full bg-online" />ONLINE
        </span>
        <span class="absolute bottom-2 right-2 rounded-full bg-primary px-2.5 py-1 text-xs font-extrabold text-white">
          {{ formatCurrency(professional.price) }}
        </span>
        <span class="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-bold text-[#ffd166]">
          ★ <span class="text-white">{{ professional.rating.toFixed(1) }}</span>
        </span>
      </div>

      <div class="p-3">
        <h3 class="truncate font-display text-sm font-bold text-ink">
          {{ professional.name }}
        </h3>
        <p class="mt-0.5 truncate text-xs font-semibold text-primary-400">
          {{ professional.profession }}
        </p>
        <p class="mt-1.5 truncate text-[11px] text-ink-faint">
          {{ professional.location.city }} · {{ formatDistance(professional.location.distanceKm) }}
        </p>
      </div>
    </article>
  </ULink>
</template>
