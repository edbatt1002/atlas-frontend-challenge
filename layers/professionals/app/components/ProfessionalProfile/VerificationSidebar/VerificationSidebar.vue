<script setup lang="ts">
import type { VerificationSidebarProps } from './types'

defineProps<VerificationSidebarProps>()
</script>

<template>
  <aside class="flex flex-col gap-4">
    <div class="rounded-[16px] border border-line bg-bg-card p-4">
      <div class="text-xs font-semibold text-ink-faint">
        A partir de
      </div>
      <div class="font-display text-2xl font-extrabold text-ink">
        {{ formatCurrency(basePrice) }}
        <span class="text-sm font-semibold text-ink-faint"> / hora</span>
      </div>

      <ProfessionalProfilePriceTiers
        :tiers="priceTiers"
        class="mt-4"
      />

      <ProfessionalProfileContactButtons
        :contact="contact"
        variant="primary"
        class="mt-4"
      />
    </div>

    <div class="rounded-[16px] border border-line bg-bg-card p-4">
      <div
        v-if="verified"
        class="flex items-center gap-2.5 border-b border-line pb-3"
      >
        <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">✓</span>
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
