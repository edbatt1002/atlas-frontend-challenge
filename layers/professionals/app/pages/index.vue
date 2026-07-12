<script setup lang="ts">
useSeoMeta({
  title: 'onluxe · Encontre quem combina com você',
  description: 'Perfis reais, avaliações e disponibilidade em tempo real na sua cidade.'
})
</script>

<template>
  <UContainer class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
    <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
      onluxe
    </div>
    <h1 class="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
      Encontre quem combina com você
    </h1>
    <p class="mt-3 max-w-xl text-sm text-ink-muted">
      Perfis reais, avaliações e disponibilidade em tempo real na sua cidade.
    </p>
    <UButton
      to="/buscar"
      color="primary"
      size="lg"
      label="Explorar profissionais"
      trailing-icon="i-lucide-arrow-right"
      class="mt-6 font-extrabold"
    />
  </UContainer>
</template>
