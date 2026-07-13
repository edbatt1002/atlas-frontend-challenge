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

if (import.meta.client) {
  watchEffect(() => {
    if (isNotFound.value) {
      showError(createError({ statusCode: 404, message: 'Profissional não encontrado' }))
      return
    }

    if (!professional.value) return

    const canonicalPath = professionalPath(professional.value.id, professional.value.name)
    if (route.path !== canonicalPath) {
      navigateTo(canonicalPath, { replace: true })
    }
  })
}

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
