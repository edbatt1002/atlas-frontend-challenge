<script setup lang="ts">
import type { RegionPickerDrawerEmits, RegionPickerDrawerProps } from './types'
import { BRAZILIAN_STATES } from './config'
import { filterStates } from './utils'

const { open, selectedCode = null } = defineProps<RegionPickerDrawerProps>()
const emit = defineEmits<RegionPickerDrawerEmits>()

const query = ref('')

watch(() => open, (value) => {
  if (value) query.value = ''
})

const suggestions = computed(() => filterStates(BRAZILIAN_STATES, query.value))
const suggestionItems = computed(() => suggestions.value.map(state => ({ label: `${state.name} · ${state.code}`, value: state.code })))

function close() {
  emit('update:open', false)
}

function selectRegion(code: string) {
  const state = suggestions.value.find(item => item.code === code)
  if (state) {
    emit('select', state)
    close()
  }
}

const { coords, resume: requestLocation, isSupported: isLocationSupported } = useGeolocation({ immediate: false })
watch(() => coords.value.latitude, (lat) => {
  if (Number.isFinite(lat)) {
    emit('useLocation')
    close()
  }
})

function useCurrentLocation() {
  requestLocation()
  close()
}
</script>

<template>
  <UDrawer
    :open="open"
    direction="bottom"
    :ui="{
      overlay: 'z-50',
      content: 'z-50 h-[70%] max-h-[70%] max-w-(--ui-container) mx-auto',
      container: 'h-full p-0 gap-0 overflow-hidden',
      body: 'flex-1 min-h-0 p-0'
    }"
    @update:open="(value: boolean) => { if (!value) close() }"
  >
    <template #body>
      <div class="flex size-full flex-col">
        <div class="flex items-center justify-between px-4.5 py-2.5">
          <h3 class="font-display text-lg font-extrabold text-ink">
            Em qual região?
          </h3>
          <UButton
            aria-label="Fechar"
            icon="i-lucide-x"
            color="neutral"
            variant="outline"
            size="sm"
            class="rounded-full"
            @click="close"
          />
        </div>

        <div class="border-t border-line p-4">
          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="Buscar estado"
            aria-label="Buscar estado"
            autocomplete="off"
            :spellcheck="false"
            class="w-full"
          />
        </div>

        <UButton
          v-if="isLocationSupported"
          block
          variant="link"
          color="primary"
          icon="i-lucide-locate-fixed"
          label="Usar minha localização atual"
          class="justify-start border-b border-line px-4 pb-3.5 font-bold"
          @click="useCurrentLocation"
        />

        <div class="flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
          <UiSelectionList
            :items="suggestionItems"
            :model-value="selectedCode ?? undefined"
            @update:model-value="selectRegion"
          />
        </div>
      </div>
    </template>
  </UDrawer>
</template>
