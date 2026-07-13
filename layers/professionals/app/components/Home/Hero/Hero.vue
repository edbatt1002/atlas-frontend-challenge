<script setup lang="ts">
import type { HeroProps } from './types'

defineProps<HeroProps>()
</script>

<template>
  <div class="relative overflow-hidden bg-bg-raised px-4 pb-28 pt-16 sm:px-6 sm:pb-36 sm:pt-24">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-bg-raised to-bg" />
    <div class="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

    <div class="relative mx-auto max-w-2xl text-center">
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1.5 text-xs font-bold text-primary-400"
        :class="{ invisible: !totalLabel }"
      >
        {{ totalLabel ?? '+600 profissionais verificados' }}
      </span>

      <h1 class="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Encontre quem combina com você
      </h1>
      <p class="mt-3 text-sm text-ink-muted sm:text-base">
        Perfis reais, avaliações e disponibilidade em tempo real na sua cidade.
      </p>
    </div>
  </div>
</template>
