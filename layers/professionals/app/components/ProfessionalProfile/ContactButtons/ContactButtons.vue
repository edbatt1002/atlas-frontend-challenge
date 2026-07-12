<script setup lang="ts">
import type { ContactButtonsProps } from './types'

const props = withDefaults(defineProps<ContactButtonsProps>(), {
  variant: 'compact'
})

const primaryNetwork = computed(() => {
  if (props.contact.whatsapp) return { network: 'whatsapp' as const, value: props.contact.whatsapp }
  if (props.contact.telegram) return { network: 'telegram' as const, value: props.contact.telegram }
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
