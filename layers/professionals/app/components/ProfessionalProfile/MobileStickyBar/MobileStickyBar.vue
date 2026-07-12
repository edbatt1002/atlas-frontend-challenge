<script setup lang="ts">
import type { MobileStickyBarProps } from './types'

defineProps<MobileStickyBarProps>()
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-xl lg:hidden">
    <div>
      <div class="text-[10px] font-semibold text-ink-faint">
        A partir de
      </div>
      <div class="font-display text-lg font-extrabold text-ink">
        {{ formatCurrency(price) }}
      </div>
    </div>
    <ProfessionalProfileContactButtons
      :contact="contact"
      variant="primary"
      class="flex-1"
    />
  </div>
</template>
