<script setup lang="ts">
import type { CatalogSheetEmits, CatalogSheetProps } from './types'
import type { ProfessionalSort } from '../../types'

const { mode, professions } = defineProps<CatalogSheetProps>()
const emit = defineEmits<CatalogSheetEmits>()

const profession = defineModel<string | undefined>('profession')
const online = defineModel<boolean | undefined>('online')
const maxPrice = defineModel<number | undefined>('maxPrice')
const minRating = defineModel<number | undefined>('minRating')
const sort = defineModel<ProfessionalSort | undefined>('sort')

const isOpen = computed(() => mode !== null)

function onUpdateOpen(open: boolean) {
  if (!open) emit('close')
}
</script>

<template>
  <UDrawer
    :open="isOpen"
    direction="bottom"
    :ui="{
      overlay: 'z-50',
      content: 'z-50 h-[60%] max-h-[60%] max-w-(--ui-container) mx-auto',
      container: 'h-full p-0 gap-0 overflow-hidden',
      body: 'flex-1 min-h-0 p-0'
    }"
    @update:open="onUpdateOpen"
  >
    <template #body>
      <div class="flex size-full flex-col">
        <CatalogSheetFilterPanel
          v-if="mode === 'filter'"
          v-model:profession="profession"
          v-model:online="online"
          v-model:max-price="maxPrice"
          v-model:min-rating="minRating"
          :professions="professions"
          @close="emit('close')"
        />

        <CatalogSheetSortPanel
          v-else-if="mode === 'sort'"
          v-model:sort="sort"
          @close="emit('close')"
        />

        <CatalogSheetGeoPrompt
          v-else-if="mode === 'geo'"
          v-model:sort="sort"
          @geo-allow="emit('geoAllow')"
          @close="emit('close')"
        />
      </div>
    </template>

    <template
      v-if="mode === 'filter'"
      #footer
    >
      <div class="flex gap-2.5 border-t border-line p-4">
        <UButton
          color="neutral"
          variant="outline"
          label="Limpar"
          @click="emit('clear')"
        />
        <UButton
          color="primary"
          label="Ver resultados"
          block
          @click="emit('close')"
        />
      </div>
    </template>
  </UDrawer>
</template>
