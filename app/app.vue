<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

const { visible: headerVisible } = useHeaderVisibility()
const { visible: bottomNavVisible } = useBottomNavVisibility()
const headerHeight = useHeaderHeight()

const headerEl = ref<HTMLElement | null>(null)
const { height } = useElementSize(headerEl)
watch(height, (h) => {
  if (h > 0) headerHeight.value = h
})

const colorMode = useColorMode()
const themeColor = computed(() => colorMode.value === 'light' ? '#f2eaef' : '#12060d')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: themeColor }
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
  <UApp
    :scroll-body="false"
    :locale="pt_br"
  >
    <div
      ref="headerEl"
      class="fixed inset-x-0 top-0 z-40 transition-transform duration-300"
      :class="headerVisible ? 'translate-y-0' : '-translate-y-full'"
    >
      <LayoutHeader />
    </div>

    <UMain
      class="pb-16 lg:pb-0"
      :style="{ paddingTop: `${headerHeight}px` }"
    >
      <NuxtPage :transition="{ name: 'page' }" />
    </UMain>

    <LayoutFooter />
    <LayoutBottomNav v-if="bottomNavVisible" />
  </UApp>
</template>
