<script setup lang="ts">
import type { VerifiedBadgeProps } from './types'
import { VERIFIED_SIZES } from './config'

const { size = 'sm' } = defineProps<VerifiedBadgeProps>()

const sizeClass = computed(() => VERIFIED_SIZES[size])
</script>

<template>
  <span
    :class="sizeClass"
    class="flex shrink-0 items-center justify-center rounded-full bg-primary text-white"
    aria-label="Perfil verificado"
  >✓</span>
</template>
