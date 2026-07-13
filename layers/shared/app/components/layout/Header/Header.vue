<script setup lang="ts">
import { LOCATION_LABEL } from './config'

const isMobileMenuOpen = ref(false)

const mobilePrimaryLinks = [
  { label: 'Home', icon: 'i-lucide-house', to: '/' },
  { label: 'Buscar', icon: 'i-lucide-search', to: '/buscar' },
  { label: 'Favoritos', icon: 'i-lucide-heart', to: '/favoritos' }
]

const mobileSecondaryLinks = [
  { label: 'Termos', icon: 'i-lucide-file-text', to: '/termos' },
  { label: 'Privacidade', icon: 'i-lucide-shield', to: '/privacidade' },
  { label: 'Suporte', icon: 'i-lucide-life-buoy', to: '/suporte' }
]

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <UHeader
    v-model:open="isMobileMenuOpen"
    mode="drawer"
    :ui="{
      content: 'z-50 h-[78%] max-h-[78%] sm:h-auto sm:max-h-[85vh] max-w-(--ui-container) mx-auto',
      overlay: 'z-50',
      body: 'flex flex-col p-0'
    }"
  >
    <template #title>
      <img
        src="/onluxe-logo.svg"
        width="146"
        height="40"
        alt="onluxe"
        class="h-8 w-auto dark:hidden"
      >
      <img
        src="/onluxe-logo-dark.svg"
        width="146"
        height="40"
        alt="onluxe"
        class="hidden h-8 w-auto dark:block"
      >
    </template>

    <template #right>
      <UButton
        icon="i-lucide-map-pin"
        :label="LOCATION_LABEL"
        color="neutral"
        variant="ghost"
        class="hidden md:flex"
      />

      <UColorModeButton />
    </template>

    <template #body>
      <div class="flex items-start justify-between gap-4 px-4.5 py-3">
        <div>
          <p class="font-display text-lg font-extrabold text-ink">
            Navegação
          </p>
          <p class="mt-1 text-xs text-ink-faint">
            Acesse as áreas principais do catálogo
          </p>
        </div>

        <UButton
          aria-label="Fechar menu"
          icon="i-lucide-x"
          color="neutral"
          variant="outline"
          size="sm"
          class="rounded-full"
          @click="closeMobileMenu"
        />
      </div>

      <div class="grid gap-4 overflow-y-auto border-t border-line p-4">
        <div>
          <p class="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
            Principal
          </p>

          <div class="grid gap-2">
            <NuxtLink
              v-for="item in mobilePrimaryLinks"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 rounded-[14px] border border-line bg-bg-card px-4 py-3 transition-colors hover:border-primary-400/50 hover:bg-primary-400/5"
              @click="closeMobileMenu"
            >
              <UIcon
                :name="item.icon"
                class="size-5 text-primary-400"
              />
              <span class="font-semibold text-ink">
                {{ item.label }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <p class="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
            Institucional
          </p>

          <div class="grid gap-2">
            <NuxtLink
              v-for="item in mobileSecondaryLinks"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 rounded-[14px] border border-line bg-bg-card px-4 py-3 transition-colors hover:border-primary-400/50 hover:bg-primary-400/5"
              @click="closeMobileMenu"
            >
              <UIcon
                :name="item.icon"
                class="size-5 text-primary-400"
              />
              <span class="font-semibold text-ink">
                {{ item.label }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </UHeader>
</template>
