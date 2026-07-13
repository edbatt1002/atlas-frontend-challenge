<script setup lang="ts">
import type { CharacteristicsGridProps } from './types'
import { buildCharacteristicItems } from './utils'

const props = defineProps<CharacteristicsGridProps>()

const items = computed(() => buildCharacteristicItems(props.characteristics))
</script>

<template>
  <div>
    <h2 class="font-display text-base font-bold text-ink">
      Características físicas
    </h2>
    <dl class="mt-2 divide-y divide-line rounded-[12px] border border-line bg-bg-soft">
      <div
        v-for="item in items"
        :key="item.label"
        class="grid grid-cols-1 gap-0.5 px-4 py-3 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-4"
      >
        <dt class="font-mono text-[10px] tracking-[0.1em] text-ink-faint">
          {{ item.label }}
        </dt>
        <dd class="text-[13px] font-semibold text-ink">
          {{ item.value }}
          <span
            v-if="item.description"
            class="mt-0.5 block text-xs font-normal text-ink-muted"
          >
            {{ item.description }}
          </span>
        </dd>
      </div>
    </dl>
  </div>
</template>
