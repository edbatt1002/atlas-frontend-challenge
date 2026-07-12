<script setup lang="ts">
import type { SheetHeaderEmits, SheetHeaderProps } from './types'

defineProps<SheetHeaderProps>()
const emit = defineEmits<SheetHeaderEmits>()
</script>

<template>
  <div class="flex items-center justify-between px-4.5 py-2.5">
    <h3 class="font-display text-lg font-extrabold text-ink">
      {{ title }}
    </h3>
    <UButton
      aria-label="Fechar"
      icon="i-lucide-x"
      color="neutral"
      variant="outline"
      size="sm"
      class="rounded-full"
      @click="emit('close')"
    />
  </div>
</template>
