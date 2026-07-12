<script setup lang="ts">
import type { IdentityHeaderProps } from './types'

defineProps<IdentityHeaderProps>()
</script>

<template>
  <div class="-mt-10 px-4 sm:px-6">
    <UAvatar
      :src="avatarUrl"
      :alt="name"
      size="3xl"
      :chip="online ? { inset: true, ui: { base: 'bg-online' } } : false"
      class="border-4 border-bg"
    />

    <span
      v-if="online"
      class="mt-3 inline-flex items-center gap-1.5 rounded-full border border-online/40 bg-online/10 px-2.5 py-1 text-[11px] font-bold text-online"
    >
      <span class="size-1.5 rounded-full bg-online" />ONLINE AGORA
    </span>

    <div class="mt-2 flex items-center gap-2">
      <h1 class="font-display text-2xl font-extrabold text-ink sm:text-3xl">
        {{ name }}
      </h1>
      <span
        v-if="verified"
        class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] text-white"
      >✓</span>
    </div>

    <div class="mt-1 flex flex-wrap items-center gap-2.5 text-sm font-semibold text-ink-muted">
      <span>{{ profession }}</span>
      <span class="text-[#ffd166]">★ {{ rating.toFixed(1) }} · {{ reviewsCount }} avaliações</span>
      <span>{{ location.city }} · {{ location.state }} · {{ formatDistance(location.distanceKm) }}</span>
    </div>
  </div>
</template>
