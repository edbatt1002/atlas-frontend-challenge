<script setup lang="ts">
import type { ContactButtonsProps } from './types'
import { telegramLink, whatsappLink } from './utils'

const props = withDefaults(defineProps<ContactButtonsProps>(), {
  variant: 'compact'
})

const primaryTo = computed(() => {
  if (props.contact.whatsapp) return { label: 'Chamar no WhatsApp', to: whatsappLink(props.contact.whatsapp), icon: 'i-simple-icons-whatsapp' }
  if (props.contact.telegram) return { label: 'Chamar no Telegram', to: telegramLink(props.contact.telegram), icon: 'i-simple-icons-telegram' }
  return null
})
</script>

<template>
  <div
    v-if="variant === 'compact' && (contact.telegram || contact.whatsapp)"
    class="flex gap-2"
  >
    <UButton
      v-if="contact.telegram"
      :to="telegramLink(contact.telegram)"
      target="_blank"
      icon="i-simple-icons-telegram"
      label="Telegram"
      color="neutral"
      variant="outline"
      class="flex-1 justify-center font-bold"
      block
    />
    <UButton
      v-if="contact.whatsapp"
      :to="whatsappLink(contact.whatsapp)"
      target="_blank"
      icon="i-simple-icons-whatsapp"
      label="WhatsApp"
      color="neutral"
      variant="outline"
      class="flex-1 justify-center font-bold"
      block
    />
  </div>

  <UButton
    v-else-if="variant === 'primary' && primaryTo"
    :to="primaryTo.to"
    target="_blank"
    :icon="primaryTo.icon"
    :label="primaryTo.label"
    color="primary"
    size="xl"
    block
    class="justify-center font-extrabold"
  />
</template>
