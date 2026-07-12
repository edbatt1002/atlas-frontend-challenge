<script setup lang="ts">
import type { MobileStickyBarProps } from './types'

defineProps<MobileStickyBarProps>()
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-bg/95 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
    <ProfessionalPriceTag
      :price="price"
      size="sm"
    />
    <ProfessionalProfileContactButtons
      :contact="contact"
      variant="primary"
      class="flex-1"
    />
  </div>
</template>
