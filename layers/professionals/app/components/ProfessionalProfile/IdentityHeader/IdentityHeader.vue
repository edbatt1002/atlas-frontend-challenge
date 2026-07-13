<script setup lang="ts">
import type { IdentityHeaderProps } from './types'

defineProps<IdentityHeaderProps>()
</script>

<template>
  <div class="-mt-10 px-4 sm:px-6">
    <div class="lg:flex lg:items-end lg:justify-between lg:gap-4">
      <div>
        <UiAvatar
          :src="avatarUrl"
          :alt="name"
          size="hero"
          :online="online"
        />

        <ProfessionalOnlineBadge
          v-if="online"
          variant="pill"
          label="ONLINE AGORA"
          class="mt-3"
        />

        <div class="mt-2 flex items-center gap-2">
          <h1 class="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {{ name }}
          </h1>
          <UiVerifiedBadge
            v-if="verified"
            size="md"
          />
        </div>

        <div class="mt-1 flex flex-wrap items-center gap-2.5 text-sm font-semibold text-ink-muted">
          <span>{{ profession }}</span>
          <UiRatingStar
            :value="rating"
            class="text-star"
          >
            · {{ reviewsCount }} avaliações
          </UiRatingStar>
          <span>{{ location.city }} · {{ location.state }} · {{ formatDistance(location.distanceKm) }}</span>
        </div>
      </div>

      <ProfessionalProfileContactButtons
        :contact="contact"
        class="mt-4 lg:mt-0 lg:shrink-0"
      />
    </div>
  </div>
</template>
