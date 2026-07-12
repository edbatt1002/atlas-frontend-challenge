<script setup lang="ts">
import type { SortPanelEmits } from './types'
import { SORT_ITEMS } from '../config'
import type { ProfessionalSort } from '../../../types'

const emit = defineEmits<SortPanelEmits>()

const sort = defineModel<ProfessionalSort | undefined>('sort')

const SORT_FEATURED_VALUE = 'featured'
const sortItems = SORT_ITEMS.map(item => ({ label: item.label, value: item.value ?? SORT_FEATURED_VALUE }))

const sortValue = computed({
  get: () => sort.value ?? SORT_FEATURED_VALUE,
  set: (value: string) => {
    sort.value = value === SORT_FEATURED_VALUE ? undefined : value as ProfessionalSort
    emit('close')
  }
})
</script>

<template>
  <CatalogSheetSheetHeader
    title="Ordenar por"
    @close="emit('close')"
  />

  <div class="flex-1 overflow-y-auto border-t border-line p-4">
    <URadioGroup
      v-model="sortValue"
      :items="sortItems"
      variant="list"
      indicator="end"
      color="primary"
    />
  </div>
</template>
