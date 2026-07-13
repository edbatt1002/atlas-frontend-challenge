<script setup lang="ts">
import { PROFILE_SECTIONS } from './config'
import type { ProfileSectionId } from './config'
import type { ProfileTabsEmits, ProfileTabsProps } from './types'

defineProps<ProfileTabsProps>()
const emit = defineEmits<ProfileTabsEmits>()

const items = PROFILE_SECTIONS.map(section => ({ label: section.label, value: section.id }))

const tabsHeight = useProfileTabsHeight()
const wrapperEl = ref<HTMLElement | null>(null)
const { height } = useElementSize(wrapperEl, undefined, { box: 'border-box' })
watch(height, (h) => {
  tabsHeight.value = h
})

function onUpdateModelValue(value: string | number) {
  emit('select', value as ProfileSectionId)
}
</script>

<template>
  <div
    ref="wrapperEl"
    class="sticky z-20 w-full border-b border-line bg-bg/95 backdrop-blur-xl"
    :style="{ top: `${topOffset}px` }"
  >
    <div class="mx-auto max-w-[1180px] px-4 sm:px-6">
      <UTabs
        :items="items"
        :model-value="active"
        :content="false"
        variant="pill"
        color="primary"
        class="w-full"
        :ui="{ list: 'bg-transparent', trigger: 'font-bold' }"
        @update:model-value="onUpdateModelValue"
      />
    </div>
  </div>
</template>
