<script setup lang="ts">
import type { PriceTiersProps } from './types'

defineProps<PriceTiersProps>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="tier in tiers"
      :key="tier.label"
      class="flex items-center justify-between rounded-[12px] border border-line bg-bg-soft px-3.5 py-2.5"
    >
      <span class="text-[13px] font-semibold text-ink-muted">{{ tier.label }}</span>
      <span class="text-sm font-extrabold text-ink">{{ formatCurrency(tier.price) }}</span>
    </div>
  </div>
</template>
