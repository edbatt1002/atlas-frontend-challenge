<script setup lang="ts">
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { VirtualizedGridProps } from './types'
import { ESTIMATED_ROW_HEIGHT_PX, OVERSCAN_ROWS, ROW_GAP_PX } from './config'
import { chunkIntoRows } from '../utils'

const props = defineProps<VirtualizedGridProps>()

const columns = useCatalogGridColumns()
const rows = computed(() => chunkIntoRows(props.items, columns.value))

const virtualizer = useWindowVirtualizer(computed(() => ({
  count: rows.value.length,
  estimateSize: () => ESTIMATED_ROW_HEIGHT_PX + ROW_GAP_PX,
  overscan: OVERSCAN_ROWS
})))

const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())

function measureRef(el: Element | { $el?: Element } | null) {
  const node = el && '$el' in el ? el.$el : el
  if (node) virtualizer.value.measureElement(node as HTMLElement)
}
</script>

<template>
  <div :style="{ position: 'relative', height: `${totalSize}px`, width: '100%' }">
    <div
      v-for="virtualRow in virtualItems"
      :key="String(virtualRow.key)"
      :ref="measureRef"
      :data-index="virtualRow.index"
      class="absolute inset-x-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      :style="{ transform: `translateY(${virtualRow.start}px)` }"
    >
      <ProfessionalCard
        v-for="(pro, colIndex) in rows[virtualRow.index]"
        :key="pro.id"
        :professional="pro"
        :priority="virtualRow.index === 0 && colIndex < priorityCount"
      />
    </div>
  </div>
</template>
