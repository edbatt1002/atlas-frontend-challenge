<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <UFooter class="hidden lg:block">
    <template #left>
      <img
        src="/onluxe-logo.svg"
        alt="onluxe"
        class="h-5 w-auto dark:hidden"
      >
      <img
        src="/onluxe-logo-dark.svg"
        alt="onluxe"
        class="hidden h-5 w-auto dark:block"
      >
    </template>

    <UNavigationMenu
      :items="[
        { label: 'Termos', to: '/termos' },
        { label: 'Privacidade', to: '/privacidade' },
        { label: 'Suporte', to: '/suporte' }
      ]"
      variant="link"
    />

    <template #right>
      <p class="text-sm text-muted">
        © {{ year }} onluxe · Catálogo de Profissionais
      </p>
    </template>
  </UFooter>
</template>
