<script setup lang="ts">
import type { ContactButtonsProps } from './types'

const { contact, variant = 'compact' } = defineProps<ContactButtonsProps>()

const primaryNetwork = computed(() => {
  if (contact.whatsapp) return { network: 'whatsapp' as const, value: contact.whatsapp }
  if (contact.telegram) return { network: 'telegram' as const, value: contact.telegram }
  return null
})
</script>

<template>
  <div
    v-if="variant === 'compact' && (contact.telegram || contact.whatsapp)"
    class="flex gap-2"
  >
    <ProfessionalProfileContactButtonsContactButton
      v-if="contact.telegram"
      network="telegram"
      :value="contact.telegram"
    />
    <ProfessionalProfileContactButtonsContactButton
      v-if="contact.whatsapp"
      network="whatsapp"
      :value="contact.whatsapp"
    />
  </div>

  <ProfessionalProfileContactButtonsContactButton
    v-else-if="variant === 'primary' && primaryNetwork"
    :network="primaryNetwork.network"
    :value="primaryNetwork.value"
    :label="`Chamar no ${primaryNetwork.network === 'whatsapp' ? 'WhatsApp' : 'Telegram'}`"
    size="xl"
  />
</template>
