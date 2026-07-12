<script setup lang="ts">
import type { ContactButtonProps } from './types'
import { CONTACT_NETWORKS } from './config'
import { buildContactLink } from './utils'

const { network: networkProp, value, size = 'md', label } = defineProps<ContactButtonProps>()

const network = computed(() => CONTACT_NETWORKS[networkProp])
const link = computed(() => buildContactLink(networkProp, value))
</script>

<template>
  <UButton
    :to="link"
    target="_blank"
    rel="noopener noreferrer"
    :icon="network.icon"
    :label="label ?? network.label"
    :size="size"
    color="neutral"
    variant="solid"
    block
    :class="[network.bgClass, network.textClass]"
    class="justify-center border-0 font-extrabold"
  />
</template>
