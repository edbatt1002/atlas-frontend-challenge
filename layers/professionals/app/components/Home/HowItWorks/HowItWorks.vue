<script setup lang="ts">
import { HOW_IT_WORKS_STEPS } from './config'
</script>

<template>
  <div class="px-4 py-10 sm:px-6">
    <div class="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
      <div
        v-for="(step, index) in HOW_IT_WORKS_STEPS"
        :key="step.title"
        class="flex flex-col gap-2"
      >
        <span class="flex size-8 items-center justify-center rounded-full bg-primary-400/15 font-display text-sm font-extrabold text-primary-400">
          {{ index + 1 }}
        </span>
        <h3 class="font-display text-base font-bold text-ink">
          {{ step.title }}
        </h3>
        <p class="text-sm text-ink-muted">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>
