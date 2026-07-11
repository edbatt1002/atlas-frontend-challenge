<template>
  <UHeader>
    <template #title>
      <img
        src="/onluxe-logo.svg"
        alt="onluxe"
        class="h-6 w-auto dark:hidden"
      >
      <img
        src="/onluxe-logo-dark.svg"
        alt="onluxe"
        class="hidden h-6 w-auto dark:block"
      >
    </template>

    <template #right>
      <UButton
        icon="i-lucide-map-pin"
        label="São Paulo"
        color="neutral"
        variant="ghost"
        class="hidden md:flex"
      />

      <UColorModeButton />
    </template>
  </UHeader>
</template>
