<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => error.statusCode === 404)
const title = computed(() => isNotFound.value ? 'Página não encontrada' : 'Algo deu errado')
const description = computed(() => isNotFound.value
  ? 'O link pode estar incorreto ou a página pode ter sido removida.'
  : 'Não conseguimos carregar essa página. Verifique sua conexão e tente de novo.')

useHead({
  title: () => `${title.value} · onluxe`,
  htmlAttrs: { lang: 'pt-BR' }
})

function handleRetry() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UApp :locale="pt_br">
    <div class="flex h-svh flex-col overflow-hidden">
      <LayoutHeader />

      <div class="flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden bg-bg px-6 pb-16 text-center lg:pb-0">
        <div class="flex size-[70px] items-center justify-center rounded-full border border-danger/40 bg-danger/10 text-3xl text-danger">
          ⚠
        </div>

        <div>
          <h1 class="font-display text-xl font-bold text-ink">
            {{ title }}
          </h1>
          <p class="mx-auto mt-1.5 max-w-[34ch] text-sm leading-relaxed text-ink-faint">
            {{ description }}
          </p>
        </div>

        <div class="flex flex-col items-center gap-2.5">
          <UButton
            v-if="isNotFound"
            to="/"
            color="primary"
            size="lg"
            label="Voltar ao início"
            class="justify-center px-6"
          />
          <UButton
            v-else
            color="primary"
            size="lg"
            label="Tentar novamente"
            class="justify-center px-6"
            @click="handleRetry"
          />

          <UButton
            to="/suporte"
            variant="link"
            color="neutral"
            size="sm"
            label="Reportar problema"
            class="font-semibold"
          />
        </div>
      </div>

      <LayoutFooter />
      <LayoutBottomNav />
    </div>
  </UApp>
</template>
