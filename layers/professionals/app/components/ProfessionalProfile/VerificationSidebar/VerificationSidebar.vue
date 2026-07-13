<script setup lang="ts">
import type { VerificationSidebarProps } from './types'

defineProps<VerificationSidebarProps>()
</script>

<template>
  <aside class="flex flex-col gap-4">
    <div class="rounded-[16px] border border-line bg-bg-card p-4">
      <ProfessionalPriceTag
        :price="basePrice"
        size="md"
        per-hour
      />

      <ProfessionalProfilePriceTiers
        :tiers="priceTiers"
        class="mt-4"
      />

      <ProfessionalProfileContactButtons
        :contact="contact"
        variant="primary"
        class="mt-4 lg:w-full"
      />
    </div>

    <div class="rounded-[16px] border border-line bg-bg-card p-4">
      <div
        v-if="verified"
        class="flex items-center gap-2.5 border-b border-line pb-3"
      >
        <UiVerifiedBadge size="lg" />
        <div>
          <div class="text-[13px] font-bold text-ink">
            Perfil verificado
          </div>
          <div class="text-xs text-ink-faint">
            Documento e fotos conferidos
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 pt-3 text-[13px]">
        <div class="flex items-center justify-between">
          <span class="text-ink-faint">Última atividade</span>
          <span class="font-semibold text-ink">{{ stats.lastActivity }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-ink-faint">Tempo de resposta</span>
          <span class="font-semibold text-ink">{{ stats.responseTime }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-ink-faint">No onluxe desde</span>
          <span class="font-semibold text-ink">{{ stats.memberSince }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>
