<script setup lang="ts">
import { LOCATION_LABEL } from './config'
</script>

<template>
  <UHeader>
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
  </UHeader>
</template>
