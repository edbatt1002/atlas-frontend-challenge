<script setup lang="ts">
import type { ProfessionalPriceTagProps } from './types'
import { PRICE_TAG_SIZES } from './config'

const { size = 'md' } = defineProps<ProfessionalPriceTagProps>()

const sizeClass = computed(() => PRICE_TAG_SIZES[size])
</script>

<template>
  <div>
    <div
      :class="sizeClass.label"
      class="font-semibold text-ink-faint"
    >
      A partir de
    </div>
    <div
      :class="sizeClass.value"
      class="font-display font-extrabold text-ink"
    >
      {{ formatCurrency(price) }}<span
        v-if="perHour"
        class="text-sm font-semibold text-ink-faint"
      > / hora</span>
    </div>
  </div>
</template>
