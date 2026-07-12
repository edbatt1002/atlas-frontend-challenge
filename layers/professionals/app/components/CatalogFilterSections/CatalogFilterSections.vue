<script setup lang="ts">
import type { CatalogFilterSectionsEmits, CatalogFilterSectionsProps } from './types'
import type { CatalogFilterSection } from '../../types'

const props = defineProps<CatalogFilterSectionsProps>()
const emit = defineEmits<CatalogFilterSectionsEmits>()

const items = computed(() => props.sections.map(section => ({
  label: section.label,
  value: section.id,
  badge: section.count > 0 ? section.count : undefined
})))

function onUpdateModelValue(value: string | number) {
  emit('select', value as CatalogFilterSection)
}
</script>

<template>
  <UTabs
    :items="items"
    :model-value="active"
    :content="false"
    orientation="vertical"
    variant="link"
    color="primary"
    class="w-[150px] min-w-[150px] shrink-0 overflow-y-auto border-r border-line bg-black/20 py-2 mb-auto"
    :ui="{ list: 'bg-transparent', trigger: 'justify-between font-semibold' }"
    @update:model-value="onUpdateModelValue"
  />
</template>
