<script setup lang="ts">
import type { ProfessionalListParams } from '../types'

const props = defineProps<{ query: ProfessionalListParams }>()
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
  { rootMargin: '400px' }
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
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        <template v-if="showFirstLoad">
          <ProfessionalCardSkeleton
            v-for="n in 10"
            :key="`first-${n}`"
          />
        </template>
        <template v-else>
          <ProfessionalCard
            v-for="pro in items"
            :key="pro.id"
            :professional="pro"
          />
          <template v-if="loadingMore">
            <ProfessionalCardSkeleton
              v-for="n in 5"
              :key="`more-${n}`"
            />
          </template>
        </template>
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
