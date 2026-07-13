<script setup lang="ts">
import { POPULAR_SHORTCUTS } from './config'
import type { State } from '../../RegionPickerDrawer/types'

const isOpen = ref(false)
const selectedLabel = ref<string | null>(null)
const selectedCode = ref<string | null>(null)

const regionLabel = computed(() => selectedLabel.value ?? 'Todo o Brasil')
const exploreTo = computed(() => selectedCode.value ? `/buscar?state=${selectedCode.value}` : '/buscar')

function open() {
  isOpen.value = true
}

function onSelect(state: State) {
  selectedLabel.value = `${state.name} · ${state.code}`
  selectedCode.value = state.code
}

function onUseLocation() {
  selectedLabel.value = 'Perto de você'
  selectedCode.value = null
}
</script>

<template>
  <div class="relative z-10 mx-auto -mt-16 max-w-lg px-4 sm:-mt-20 sm:px-6">
    <div class="rounded-[20px] border border-line bg-bg-card p-4 shadow-card sm:p-5">
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-primary-400">
        Em qual região?
      </div>

      <UButton
        block
        color="neutral"
        variant="outline"
        leading-icon="i-lucide-map-pin"
        trailing-icon="i-lucide-chevron-down"
        :label="regionLabel"
        class="mt-2 justify-start font-semibold"
        @click="open"
      />

      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span class="text-ink-faint">Popular:</span>
        <NuxtLink
          v-for="shortcut in POPULAR_SHORTCUTS"
          :key="shortcut.label"
          :to="shortcut.to"
          class="rounded-full border border-line bg-bg-soft px-2.5 py-1 font-semibold text-ink-muted"
        >
          {{ shortcut.label }}
        </NuxtLink>
      </div>

      <UButton
        :to="exploreTo"
        block
        color="primary"
        size="lg"
        label="Buscar profissionais"
        trailing-icon="i-lucide-arrow-right"
        class="mt-4 justify-center font-extrabold"
      />
    </div>

    <RegionPickerDrawer
      v-model:open="isOpen"
      :selected-code="selectedCode"
      @select="onSelect"
      @use-location="onUseLocation"
    />
  </div>
</template>
