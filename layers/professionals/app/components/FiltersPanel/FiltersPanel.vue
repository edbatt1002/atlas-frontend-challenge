<script setup lang="ts">
import type { ProfessionalSort } from '../../types'
import type { FiltersPanelProps } from './types'
import { SORT_ITEMS } from './config'

defineProps<FiltersPanelProps>()
const emit = defineEmits<{ clear: [] }>()

const search = defineModel<string>('search')
const profession = defineModel<string | undefined>('profession')
const minPrice = defineModel<number | undefined>('minPrice')
const maxPrice = defineModel<number | undefined>('maxPrice')
const sort = defineModel<ProfessionalSort | undefined>('sort')
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-line bg-bg-soft p-3 lg:flex-row lg:flex-wrap lg:items-center">
    <UInput
      v-model="search"
      icon="i-lucide-search"
      placeholder="Buscar por nome ou profissão"
      class="lg:flex-1 lg:min-w-64"
    />

    <USelect
      v-model="profession"
      :items="[{ label: 'Todas as profissões', value: undefined }, ...professions.map(p => ({ label: p.label, value: p.slug }))]"
      placeholder="Profissão"
      class="lg:w-52"
    />

    <div class="flex gap-2">
      <UInput
        v-model.number="minPrice"
        type="number"
        placeholder="Preço mín."
        class="w-32"
      />
      <UInput
        v-model.number="maxPrice"
        type="number"
        placeholder="Preço máx."
        class="w-32"
      />
    </div>

    <USelect
      v-model="sort"
      :items="SORT_ITEMS"
      placeholder="Ordenar"
      class="lg:w-48"
    />

    <UButton
      variant="ghost"
      color="neutral"
      icon="i-lucide-x"
      label="Limpar"
      @click="emit('clear')"
    />
  </div>
</template>
