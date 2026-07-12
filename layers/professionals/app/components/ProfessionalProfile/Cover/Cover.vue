<script setup lang="ts">
import type { CoverProps } from './types'

defineProps<CoverProps>()
</script>

<template>
  <div class="relative aspect-[3/1] w-full overflow-hidden bg-bg-raised">
    <NuxtImg
      :src="coverUrl"
      :alt="`Capa de ${name}`"
      loading="eager"
      fetchpriority="high"
      sizes="100vw"
      width="1200"
      height="400"
      format="webp"
      class="size-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />

    <UButton
      to="/buscar"
      aria-label="Voltar ao catálogo"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="soft"
      size="lg"
      class="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 text-white"
    />

    <UButton
      aria-label="Favoritar"
      icon="i-lucide-heart"
      color="neutral"
      variant="soft"
      size="lg"
      class="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 text-primary-400"
    />
  </div>
</template>
