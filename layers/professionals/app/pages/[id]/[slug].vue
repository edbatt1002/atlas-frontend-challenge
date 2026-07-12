<script setup lang="ts">
import type { FetchError } from 'ofetch'

const { visible: bottomNavVisible } = useBottomNavVisibility()
onMounted(() => {
  bottomNavVisible.value = false
})
onUnmounted(() => {
  bottomNavVisible.value = true
})

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data: professional, isPending, error } = useProfessional(id)

const isNotFound = computed(() => (error.value as FetchError | null)?.statusCode === 404)

useProfessionalSeo(professional, isNotFound)
</script>

<template>
  <div>
    <p
      v-if="isPending"
      class="py-24 text-center text-sm text-ink-faint"
    >
      Carregando perfil…
    </p>

    <div
      v-else-if="isNotFound"
      class="px-4 py-24 text-center"
    >
      <p class="font-display text-lg font-bold text-ink">
        Profissional não encontrado
      </p>
      <p class="mt-1 text-sm text-ink-faint">
        Esse perfil pode ter sido removido ou o link está incorreto.
      </p>
      <NuxtLink
        to="/buscar"
        class="mt-4 inline-block rounded-[11px] bg-primary px-5 py-2.5 text-sm font-bold text-white"
      >
        Voltar ao catálogo
      </NuxtLink>
    </div>

    <p
      v-else-if="error"
      class="py-24 text-center text-danger"
    >
      Não foi possível carregar esse perfil.
    </p>

    <ProfessionalProfile
      v-else-if="professional"
      :professional="professional"
    />
  </div>
</template>
