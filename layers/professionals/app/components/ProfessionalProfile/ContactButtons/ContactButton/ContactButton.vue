<script setup lang="ts">
import type { ContactButtonProps } from './types'
import { CONTACT_NETWORKS } from './config'
import { buildContactLink } from './utils'

const props = withDefaults(defineProps<ContactButtonProps>(), {
  size: 'md'
})

const network = computed(() => CONTACT_NETWORKS[props.network])
const link = computed(() => buildContactLink(props.network, props.value))
</script>

<template>
  <UButton
    :to="link"
    target="_blank"
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
