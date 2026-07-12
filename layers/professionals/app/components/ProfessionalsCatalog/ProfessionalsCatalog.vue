<script setup lang="ts">
import type { ProfessionalsCatalogProps } from './types'
import { FIRST_LOAD_SKELETONS, INFINITE_SCROLL_ROOT_MARGIN, LOAD_MORE_SKELETONS, PRIORITY_CARD_COUNT } from './config'

const props = defineProps<ProfessionalsCatalogProps>()
const emit = defineEmits<{ clear: [] }>()

const { items, isPending, error, hasNextPage, fetchNextPage } = useProfessionals(() => props.query)

const loadingMore = ref(false)
async function loadMore() {
  if (loadingMore.value || !hasNextPage.value) return
  loadingMore.value = true
  try {
    await fetchNextPage()
  } finally {
    loadingMore.value = false
  }
}

const sentinel = ref<HTMLElement | null>(null)
useIntersectionObserver(
  sentinel,
  ([entry]) => {
    if (entry?.isIntersecting) loadMore()
  },
  { rootMargin: INFINITE_SCROLL_ROOT_MARGIN }
)

const showFirstLoad = computed(() => isPending.value && items.value.length === 0)
const isEmpty = computed(() => !isPending.value && !error.value && items.value.length === 0)
const reachedEnd = computed(() => !hasNextPage.value && items.value.length > 0)
</script>

<template>
  <div>
    <p
      v-if="error"
      class="py-16 text-center text-danger"
    >
      Não foi possível carregar os profissionais.
    </p>

    <div
      v-else-if="isEmpty"
      class="py-20 text-center"
    >
      <div class="text-4xl opacity-50">
        ◍
      </div>
      <p class="mt-3 font-display text-lg font-bold text-ink">
        Nada por aqui
      </p>
      <p class="mt-1 text-sm text-ink-faint">
        Nenhum profissional bate com esses filtros.
      </p>
      <UButton
        class="mt-4"
        color="primary"
        label="Limpar filtros"
        @click="emit('clear')"
      />
    </div>

    <div v-else>
      <div
        v-if="showFirstLoad"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ProfessionalCardSkeleton
          v-for="n in FIRST_LOAD_SKELETONS"
          :key="`first-${n}`"
        />
      </div>

      <ClientOnly v-else>
        <ProfessionalsCatalogVirtualizedGrid
          :items="items"
          :priority-count="PRIORITY_CARD_COUNT"
        />

        <template #fallback>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProfessionalCard
              v-for="(pro, index) in items"
              :key="pro.id"
              :professional="pro"
              :priority="index < PRIORITY_CARD_COUNT"
            />
          </div>
        </template>
      </ClientOnly>

      <div
        v-if="loadingMore"
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ProfessionalCardSkeleton
          v-for="n in LOAD_MORE_SKELETONS"
          :key="`more-${n}`"
        />
      </div>

      <p
        v-if="reachedEnd"
        class="py-8 text-center text-sm text-ink-faint"
      >
        ✦ Você chegou ao fim da lista
      </p>

      <div
        ref="sentinel"
        class="h-px"
      />
    </div>
  </div>
</template>
