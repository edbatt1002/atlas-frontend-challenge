<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  htmlAttrs: {
    lang: 'pt-BR'
  }
})

const title = 'onluxe · Catálogo de Profissionais'
const description = 'Encontre profissionais autônomos perto de você. Perfis verificados, avaliações e disponibilidade em tempo real.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <LayoutHeader />

    <UMain class="pb-16 lg:pb-0">
      <NuxtPage />
    </UMain>

    <LayoutFooter />
    <LayoutBottomNav />
  </UApp>
</template>
