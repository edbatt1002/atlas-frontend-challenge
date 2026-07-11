<script setup lang="ts">
import { FOOTER_LINKS } from './config'

const year = new Date().getFullYear()
</script>

<template>
  <UFooter class="hidden lg:block">
    <template #left>
      <img
        src="/onluxe-logo.svg"
        alt="onluxe"
        class="h-8 w-auto dark:hidden"
      >
      <img
        src="/onluxe-logo-dark.svg"
        alt="onluxe"
        class="hidden h-8 w-auto dark:block"
      >
    </template>

    <UNavigationMenu
      :items="FOOTER_LINKS"
      variant="link"
    />

    <template #right>
      <p class="text-sm text-muted">
        © {{ year }} onluxe · Catálogo de Profissionais
      </p>
    </template>
  </UFooter>
</template>
