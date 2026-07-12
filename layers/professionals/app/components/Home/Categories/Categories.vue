<script setup lang="ts">
import type { CategoriesProps } from './types'

defineProps<CategoriesProps>()
</script>

<template>
  <div class="px-4 py-8 sm:px-6">
    <div class="mx-auto max-w-4xl">
      <h2 class="font-display text-lg font-bold text-ink">
        Categorias populares
      </h2>

      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/buscar?profession=${category.slug}`"
          class="w-full flex flex-col gap-2 rounded-[14px] border border-line bg-bg-card p-4"
        >
          <UIcon
            :name="category.icon"
            class="size-6 text-primary-400"
          />
          <div>
            <div class="text-sm font-bold text-ink">
              {{ category.label }}
            </div>
            <div class="text-xs text-ink-faint">
              {{ category.count ?? '—' }} perfis
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
