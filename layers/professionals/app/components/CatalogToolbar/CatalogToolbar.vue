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
  toolbarHeight.value = h
})

const topOffset = computed(() => headerVisible.value ? headerHeight.value : 0)
</script>

<template>
  <div
    ref="toolbarEl"
    class="fixed inset-x-0 z-30 border-b border-line bg-bg/95 py-3 backdrop-blur-xl transition-[top] duration-300"
    :style="{ top: `${topOffset}px` }"
  >
    <UContainer class="flex flex-col gap-3">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Buscar por nome ou profissão"
        size="lg"
      />

      <div class="flex gap-2">
        <div class="flex-1">
          <UChip
            :show="filterCount > 0"
            :text="filterCount"
            color="primary"
            size="sm"
            class="block w-full"
          >
            <button
              type="button"
              class="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[11px] border border-line bg-bg-soft px-3 py-2 text-[13px] font-bold text-ink"
              @click="emit('open', 'filter')"
            >
              <UIcon
                name="i-lucide-sliders-horizontal"
                class="size-4"
              />
              Filtros
            </button>
          </UChip>
        </div>

        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[11px] border border-line bg-bg-soft px-3 py-2 text-[13px] font-bold text-ink"
          @click="emit('open', 'geo')"
        >
          <UIcon
            name="i-lucide-map-pin"
            class="size-4"
          />
          Distância
        </button>

        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[11px] border border-line bg-bg-soft px-3 py-2 text-[13px] font-bold text-ink"
          @click="emit('open', 'sort')"
        >
          <UIcon
            name="i-lucide-arrow-up-down"
            class="size-4"
          />
          Ordenar
        </button>
      </div>
    </UContainer>
  </div>
</template>
