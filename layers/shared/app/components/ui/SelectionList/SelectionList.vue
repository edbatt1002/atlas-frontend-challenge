<script setup lang="ts">
import type { SelectionListEmits, SelectionListProps } from './types'

const { items, modelValue } = defineProps<SelectionListProps>()
const emit = defineEmits<SelectionListEmits>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <UButton
      v-for="item in items"
      :key="item.value"
      block
      :variant="item.value === modelValue ? 'soft' : 'ghost'"
      :color="item.value === modelValue ? 'primary' : 'neutral'"
      :trailing-icon="item.value === modelValue ? 'i-lucide-check' : undefined"
      :label="item.label"
      class="justify-between rounded-xl px-3.5 py-3 text-[13px] font-semibold"
      @click="emit('update:modelValue', item.value)"
    />
  </div>
</template>
