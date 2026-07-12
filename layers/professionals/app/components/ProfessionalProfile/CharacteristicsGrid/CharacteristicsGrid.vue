<script setup lang="ts">
import type { CharacteristicsGridProps } from './types'
import { buildCharacteristicItems } from './utils'

const props = defineProps<CharacteristicsGridProps>()

const items = computed(() => buildCharacteristicItems(props.characteristics))
</script>

<template>
  <div>
    <h2 class="font-display text-base font-bold text-ink">
      Características
    </h2>
    <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
      <div
        v-for="item in items"
        :key="item.label"
        class="rounded-[12px] border border-line bg-bg-soft px-3 py-2.5"
      >
        <div class="font-mono text-[10px] tracking-[0.1em] text-ink-faint">
          {{ item.label }}
        </div>
        <div class="mt-0.5 text-[13px] font-semibold text-ink">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>
