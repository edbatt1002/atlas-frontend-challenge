<script setup lang="ts">
import type { AvatarProps } from './types'
import { AVATAR_SIZES } from './config'
import { getInitials } from './utils'

const { src, alt, size = 'md', online = false } = defineProps<AvatarProps>()

const sizeClasses = computed(() => AVATAR_SIZES[size])
const initials = computed(() => getInitials(alt))
</script>

<template>
  <div class="relative inline-flex flex-none">
    <div
      :class="sizeClasses.container"
      class="relative overflow-hidden rounded-full border-bg bg-bg-raised"
    >
      <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="size-full object-cover"
      >
      <span
        v-else
        :class="sizeClasses.text"
        class="flex size-full items-center justify-center font-display font-bold text-ink-muted"
      >{{ initials }}</span>
    </div>

    <span
      v-if="online"
      :class="sizeClasses.dot"
      class="absolute rounded-full border-bg bg-online"
      aria-label="Online agora"
    />
  </div>
</template>
