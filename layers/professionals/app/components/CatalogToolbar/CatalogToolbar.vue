<script setup lang="ts">
import type { CatalogToolbarEmits, CatalogToolbarProps } from './types'
import { BRAZILIAN_STATES } from '../RegionPickerDrawer/config'
import type { State } from '../RegionPickerDrawer/types'

defineProps<CatalogToolbarProps>()
const emit = defineEmits<CatalogToolbarEmits>()

const state = defineModel<string | undefined>('state')

const { visible: headerVisible } = useHeaderVisibility()
const headerHeight = useHeaderHeight()
const toolbarHeight = useCatalogToolbarHeight()

const toolbarEl = ref<HTMLElement | null>(null)
const { height } = useElementSize(toolbarEl, undefined, { box: 'border-box' })
watch(height, (h) => {
  if (h > 0) toolbarHeight.value = h
})

const topOffset = computed(() => headerVisible.value ? headerHeight.value : 0)

const isRegionPickerOpen = ref(false)
const stateLabel = computed(() => {
  const picked = BRAZILIAN_STATES.find(s => s.code === state.value)
  return picked ? `${picked.name} · ${picked.code}` : 'Buscar por endereço'
})

function onSelectRegion(picked: State) {
  state.value = picked.code
}

function onUseLocation() {
  state.value = undefined
}

function openRegionPicker() {
  isRegionPickerOpen.value = true
}
</script>

<template>
  <div
    ref="toolbarEl"
    class="fixed inset-x-0 z-30 border-b border-line bg-bg/95 py-3 backdrop-blur-xl transition-[top] duration-300"
    :style="{ top: `${topOffset}px` }"
  >
    <UContainer class="flex flex-col gap-4">
      <UButton
        block
        color="neutral"
        variant="outline"
        leading-icon="i-lucide-map-pin"
        trailing-icon="i-lucide-chevron-down"
        :label="stateLabel"
        size="lg"
        class="justify-start font-semibold"
        @click="openRegionPicker"
      />

      <RegionPickerDrawer
        v-model:open="isRegionPickerOpen"
        :selected-code="state ?? null"
        @select="onSelectRegion"
        @use-location="onUseLocation"
      />

      <div class="flex gap-4">
        <UChip
          :show="filterCount > 0"
          :text="filterCount"
          color="primary"
          size="3xl"
          class="flex-1"
          :ui="{ base: 'h-5 min-w-5 px-1 text-[11px] font-bold' }"
        >
          <UButton
            block
            color="neutral"
            variant="outline"
            icon="i-lucide-sliders-horizontal"
            label="Filtros"
            class="justify-center font-bold"
            @click="emit('open', 'filter')"
          />
        </UChip>

        <UButton
          block
          color="neutral"
          variant="outline"
          icon="i-lucide-map-pin"
          label="Distância"
          class="flex-1 justify-center font-bold"
          @click="emit('open', 'geo')"
        />

        <UButton
          block
          color="neutral"
          variant="outline"
          icon="i-lucide-arrow-up-down"
          label="Ordenar"
          class="flex-1 justify-center font-bold"
          @click="emit('open', 'sort')"
        />
      </div>
    </UContainer>
  </div>
</template>
