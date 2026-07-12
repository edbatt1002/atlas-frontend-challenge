<script setup lang="ts">
import type { RatingStarProps } from './types'

defineProps<RatingStarProps>()
</script>

<template>
  <span class="inline-flex items-center gap-1">
    <span class="text-star">★</span>
    <span>{{ value.toFixed(1) }}</span>
    <slot />
  </span>
</template>
