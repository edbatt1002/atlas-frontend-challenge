<script setup lang="ts">
import type { CatalogSheetEmits, CatalogSheetProps } from './types'
import { FILTER_SECTIONS, PRICE_MAX, PRICE_MIN, PRICE_STEP, RATING_CHIPS, SORT_ITEMS } from './config'
import type { CatalogFilterSection, ProfessionalSort } from '../../types'

const props = defineProps<CatalogSheetProps>()
const emit = defineEmits<CatalogSheetEmits>()

const isOpen = computed(() => props.mode !== null)

function onUpdateOpen(open: boolean) {
  if (!open) emit('close')
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
    profissao: props.profession ? 1 : 0,
    disponibilidade: props.online ? 1 : 0,
    preco: props.maxPrice != null ? 1 : 0,
    avaliacao: props.minRating != null ? 1 : 0
  }[section.id]
})))

const priceActive = computed(() => props.maxPrice != null && props.maxPrice < PRICE_MAX)
const maxPriceLabel = computed(() => priceActive.value ? `até ${formatCurrency(props.maxPrice!)}` : 'Qualquer')

function onMaxPriceInput(event: Event) {
  emit('update:maxPrice', Number((event.target as HTMLInputElement).value))
}

const { resume: requestGeolocation, isSupported: isGeolocationSupported } = useGeolocation({ immediate: false })

function onGeoAllow() {
  if (isGeolocationSupported.value) requestGeolocation()
  emit('update:sort', 'nearest')
  emit('geoAllow')
  emit('close')
}

function onSelectSort(value: ProfessionalSort | undefined) {
  emit('update:sort', value)
  emit('close')
}

const title = computed(() => {
  if (props.mode === 'filter') return 'Filtros'
  if (props.mode === 'sort') return 'Ordenar por'
  return undefined
})
</script>

<template>
  <UDrawer
    :open="isOpen"
    direction="bottom"
    :ui="{
      overlay: 'z-50',
      content: 'z-50 h-[60%] max-h-[60%] max-w-(--ui-container) mx-auto',
      container: 'p-0 gap-0 overflow-hidden',
      body: 'flex-1 min-h-0 p-0'
    }"
    @update:open="onUpdateOpen"
  >
    <template #body>
      <div class="flex size-full flex-col">
        <template v-if="mode === 'filter'">
          <div class="flex items-center justify-between px-4.5 py-2.5">
            <h3 class="font-display text-lg font-extrabold text-ink">
              {{ title }}
            </h3>
            <button
              type="button"
              aria-label="Fechar"
              class="flex size-8 items-center justify-center rounded-full border border-line text-ink"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

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
                  <button
                    type="button"
                    class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
                    :class="!profession ? 'bg-primary text-white' : 'border border-line text-ink-muted'"
                    @click="emit('update:profession', undefined)"
                  >
                    Todas
                  </button>
                  <button
                    v-for="p in professions"
                    :key="p.slug"
                    type="button"
                    class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
                    :class="profession === p.slug ? 'bg-primary text-white' : 'border border-line text-ink-muted'"
                    @click="emit('update:profession', p.slug)"
                  >
                    {{ p.label }}
                  </button>
                </div>
              </div>

              <div
                :ref="setSectionRef('disponibilidade')"
                class="mt-7"
              >
                <div class="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-ink-faint">
                  DISPONIBILIDADE
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-bold"
                  :class="online ? 'bg-online text-[#04140d]' : 'border border-online/35 text-online'"
                  @click="emit('update:online', !online)"
                >
                  <span class="size-1.5 rounded-full bg-current" />Somente online agora
                </button>
              </div>

              <div
                :ref="setSectionRef('preco')"
                class="mt-7"
              >
                <div class="mb-2.5 flex items-center justify-between">
                  <span class="font-mono text-[10px] tracking-[0.14em] text-ink-faint">PREÇO MÁXIMO</span>
                  <span class="text-[13px] font-extrabold text-primary-400">{{ maxPriceLabel }}</span>
                </div>
                <input
                  type="range"
                  :min="PRICE_MIN"
                  :max="PRICE_MAX"
                  :step="PRICE_STEP"
                  :value="maxPrice ?? PRICE_MAX"
                  class="w-full accent-primary"
                  @input="onMaxPriceInput"
                >
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
                  <button
                    v-for="chip in RATING_CHIPS"
                    :key="chip.label"
                    type="button"
                    class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
                    :class="minRating === chip.value ? 'bg-primary text-white' : 'border border-line text-ink-muted'"
                    @click="emit('update:minRating', chip.value)"
                  >
                    {{ chip.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="mode === 'sort'">
          <div class="flex items-center justify-between px-4.5 py-2.5">
            <h3 class="font-display text-lg font-extrabold text-ink">
              {{ title }}
            </h3>
            <button
              type="button"
              aria-label="Fechar"
              class="flex size-8 items-center justify-center rounded-full border border-line text-ink"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="flex flex-1 flex-col gap-2 overflow-y-auto border-t border-line p-4">
            <button
              v-for="item in SORT_ITEMS"
              :key="item.label"
              type="button"
              class="flex items-center justify-between rounded-xl border px-3.5 py-3.5 text-left text-sm font-semibold"
              :class="sort === item.value ? 'border-primary bg-primary/10 text-ink' : 'border-line text-ink-muted'"
              @click="onSelectSort(item.value)"
            >
              <span>{{ item.label }}</span>
              <span
                class="size-4 shrink-0 rounded-full border-2"
                :class="sort === item.value ? 'border-primary bg-primary' : 'border-white/25'"
              />
            </button>
          </div>
        </template>

        <template v-else-if="mode === 'geo'">
          <div class="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div class="flex size-[70px] items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-3xl text-primary-400">
              <UIcon name="i-lucide-map-pin" />
            </div>
            <h3 class="mt-5 font-display text-xl font-extrabold text-ink">
              Usar sua localização?
            </h3>
            <p class="mt-2 max-w-[30ch] text-[13.5px] text-ink-faint">
              Permita o acesso à sua localização para mostrarmos os perfis mais próximos de você.
            </p>
            <UButton
              class="mt-5 w-full max-w-[260px] justify-center"
              color="primary"
              size="lg"
              label="Permitir localização"
              @click="onGeoAllow"
            />
            <button
              type="button"
              class="mt-2.5 text-[13px] font-semibold text-ink-faint"
              @click="emit('close')"
            >
              Agora não
            </button>
          </div>
        </template>
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
