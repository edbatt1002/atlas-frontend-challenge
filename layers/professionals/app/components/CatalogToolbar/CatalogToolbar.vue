<script setup lang="ts">
import type { CatalogToolbarEmits, CatalogToolbarProps } from './types'

defineProps<CatalogToolbarProps>()
const emit = defineEmits<CatalogToolbarEmits>()

const search = defineModel<string>('search', { required: true })

const { visible: headerVisible } = useHeaderVisibility()
const headerHeight = useHeaderHeight()
const toolbarHeight = useCatalogToolbarHeight()

const toolbarEl = ref<HTMLElement | null>(null)
const { height } = useElementSize(toolbarEl)
watch(height, (h) => {
  if (h > 0) toolbarHeight.value = h
})

const topOffset = computed(() => headerVisible.value ? headerHeight.value : 0)
</script>

<template>
  <div
    ref="toolbarEl"
    class="fixed inset-x-0 z-30 border-b border-line bg-bg/95 py-3 backdrop-blur-xl transition-[top] duration-300"
    :style="{ top: `${topOffset}px` }"
  >
    <UContainer class="flex flex-col gap-4">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Buscar por nome ou profissão"
        aria-label="Buscar por nome ou profissão"
        autocomplete="off"
        :spellcheck="false"
        size="lg"
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
