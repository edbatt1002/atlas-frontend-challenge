<script setup lang="ts">
import type { FilterPanelEmits, FilterPanelProps } from './types'
import { FILTER_SECTIONS, PRICE_MAX, PRICE_MIN, PRICE_STEP, RATING_CHIPS } from '../config'
import type { CatalogFilterSection } from '../../../types'

defineProps<FilterPanelProps>()
const emit = defineEmits<FilterPanelEmits>()

const profession = defineModel<string | undefined>('profession')
const online = defineModel<boolean | undefined>('online')
const maxPrice = defineModel<number | undefined>('maxPrice')
const minRating = defineModel<number | undefined>('minRating')

function selectProfession(slug: string | undefined) {
  profession.value = slug
}

function toggleOnline() {
  online.value = !online.value
}

function selectMinRating(value: number | undefined) {
  minRating.value = value
}

const paneRef = ref<HTMLElement | null>(null)
const sectionRefs = reactive<Partial<Record<CatalogFilterSection, HTMLElement>>>({})
const activeSection = ref<CatalogFilterSection>('profissao')

function setSectionRef(id: CatalogFilterSection) {
  return (el: unknown) => {
    sectionRefs[id] = (el as HTMLElement | null) ?? undefined
  }
}

FILTER_SECTIONS.forEach((section) => {
  useIntersectionObserver(
    () => sectionRefs[section.id],
    ([entry]) => {
      if (entry?.isIntersecting) activeSection.value = section.id
    },
    { root: paneRef, rootMargin: '0px 0px -70% 0px' }
  )
})

function scrollToSection(id: CatalogFilterSection) {
  sectionRefs[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const filterSectionsWithCount = computed(() => FILTER_SECTIONS.map(section => ({
  ...section,
  count: {
    profissao: profession.value ? 1 : 0,
    disponibilidade: online.value ? 1 : 0,
    preco: maxPrice.value != null ? 1 : 0,
    avaliacao: minRating.value != null ? 1 : 0
  }[section.id]
})))

const priceActive = computed(() => maxPrice.value != null && maxPrice.value < PRICE_MAX)
const maxPriceLabel = computed(() => priceActive.value ? `até ${formatCurrency(maxPrice.value!)}` : 'Qualquer')

function onMaxPriceUpdate(value: number | undefined) {
  if (value != null) maxPrice.value = value
}
</script>

<template>
  <CatalogSheetSheetHeader
    title="Filtros"
    @close="emit('close')"
  />

  <div class="flex min-h-0 flex-1 border-t border-line">
    <CatalogFilterSections
      :sections="filterSectionsWithCount"
      :active="activeSection"
      @select="scrollToSection"
    />

    <div
      ref="paneRef"
      class="flex-1 overflow-y-auto p-4"
    >
      <div :ref="setSectionRef('profissao')">
        <div class="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-ink-faint">
          PROFISSÃO
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton
            label="Todas"
            size="sm"
            :color="!profession ? 'primary' : 'neutral'"
            :variant="!profession ? 'solid' : 'outline'"
            class="rounded-full font-semibold"
            @click="selectProfession(undefined)"
          />
          <UButton
            v-for="p in professions"
            :key="p.slug"
            :label="p.label"
            size="sm"
            :color="profession === p.slug ? 'primary' : 'neutral'"
            :variant="profession === p.slug ? 'solid' : 'outline'"
            class="rounded-full font-semibold"
            @click="selectProfession(p.slug)"
          />
        </div>
      </div>

      <div
        :ref="setSectionRef('disponibilidade')"
        class="mt-7"
      >
        <div class="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-ink-faint">
          DISPONIBILIDADE
        </div>
        <UButton
          label="Somente online agora"
          color="neutral"
          variant="outline"
          class="rounded-full font-bold"
          :class="online ? 'border-transparent bg-online text-[#04140d] hover:bg-online' : 'border-online/35 text-online'"
          @click="toggleOnline"
        >
          <template #leading>
            <span class="size-1.5 rounded-full bg-current" />
          </template>
        </UButton>
      </div>

      <div
        :ref="setSectionRef('preco')"
        class="mt-7"
      >
        <div class="mb-2.5 flex items-center justify-between">
          <span class="font-mono text-[10px] tracking-[0.14em] text-ink-faint">PREÇO MÁXIMO</span>
          <span class="text-[13px] font-extrabold text-primary-400">{{ maxPriceLabel }}</span>
        </div>
        <USlider
          :min="PRICE_MIN"
          :max="PRICE_MAX"
          :step="PRICE_STEP"
          :model-value="maxPrice ?? PRICE_MAX"
          color="primary"
          aria-label="Preço máximo"
          @update:model-value="onMaxPriceUpdate"
        />
        <div class="mt-1.5 flex justify-between text-[11px] text-ink-faint">
          <span>{{ formatCurrency(PRICE_MIN) }}</span>
          <span>{{ formatCurrency(PRICE_MAX) }}+</span>
        </div>
      </div>

      <div
        :ref="setSectionRef('avaliacao')"
        class="mt-7"
      >
        <div class="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-ink-faint">
          AVALIAÇÃO MÍNIMA
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="chip in RATING_CHIPS"
            :key="chip.label"
            :label="chip.label"
            size="sm"
            :color="minRating === chip.value ? 'primary' : 'neutral'"
            :variant="minRating === chip.value ? 'solid' : 'outline'"
            class="rounded-full font-semibold"
            @click="selectMinRating(chip.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
