<script setup lang="ts">
import type { ProfessionalOnlineBadgeProps } from './types'
import { ONLINE_VARIANTS } from './config'

const { variant } = defineProps<ProfessionalOnlineBadgeProps>()

const variantClass = computed(() => ONLINE_VARIANTS[variant])
</script>

<template>
  <span
    :class="variantClass"
    class="inline-flex items-center rounded-full border border-online/40 font-bold text-online"
  >
    <span class="size-1.5 rounded-full bg-online" />{{ label }}
  </span>
</template>
