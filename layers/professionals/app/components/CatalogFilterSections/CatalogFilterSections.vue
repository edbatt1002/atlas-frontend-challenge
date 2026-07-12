<script setup lang="ts">
import type { CatalogFilterSectionsEmits, CatalogFilterSectionsProps } from './types'

defineProps<CatalogFilterSectionsProps>()
const emit = defineEmits<CatalogFilterSectionsEmits>()
</script>

<template>
  <div class="w-[150px] min-w-[150px] shrink-0 overflow-y-auto border-r border-line bg-black/20 py-2">
    <UButton
      v-for="section in sections"
      :key="section.id"
      type="button"
      class="relative flex w-full items-center justify-between gap-1.5 border-l-[3px] px-3.5 py-3 text-left text-[13px] transition-colors"
      :class="section.id === active
        ? 'border-primary bg-primary/10 font-bold text-ink'
        : 'border-transparent font-semibold text-ink-faint'"
      @click="emit('select', section.id)"
    >
      <span>{{ section.label }}</span>
      <span
        v-if="section.count > 0"
        class="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-white"
      >
        {{ section.count }}
      </span>
    </UButton>
  </div>
</template>
