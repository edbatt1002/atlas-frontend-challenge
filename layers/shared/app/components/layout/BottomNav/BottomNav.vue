<script setup lang="ts">
import { NAV_ITEMS } from './config'

const route = useRoute()
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 flex justify-between border-t border-default bg-default/85 px-6 py-2.5 backdrop-blur-xl lg:hidden"
  >
    <NuxtLink
      v-for="item in NAV_ITEMS"
      :key="item.to"
      :to="item.to"
      class="flex flex-col items-center gap-0.5 text-[10px] font-semibold"
      :class="route.path === item.to ? 'text-primary' : 'text-muted'"
    >
      <UIcon
        :name="item.icon"
        class="size-5"
      />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
