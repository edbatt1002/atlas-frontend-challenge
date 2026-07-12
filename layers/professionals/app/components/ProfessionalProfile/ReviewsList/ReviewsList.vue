<script setup lang="ts">
import type { ReviewsListProps } from './types'

defineProps<ReviewsListProps>()
</script>

<template>
  <div
    v-if="reviews.length > 0"
    class="flex flex-col gap-2.5"
  >
    <h2 class="font-display text-base font-bold text-ink">
      Avaliações
    </h2>
    <div
      v-for="review in reviews"
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
