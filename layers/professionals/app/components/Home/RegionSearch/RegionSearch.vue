<script setup lang="ts">
import { BRAZILIAN_STATES, POPULAR_SHORTCUTS } from './config'
import { filterStates } from './utils'

const isOpen = ref(false)
const query = ref('')
const selectedLabel = ref<string | null>(null)
const selectedCode = ref<string | null>(null)

const regionLabel = computed(() => selectedLabel.value ?? 'Todo o Brasil')
const suggestions = computed(() => filterStates(BRAZILIAN_STATES, query.value))
const exploreTo = computed(() => selectedCode.value ? `/buscar?state=${selectedCode.value}` : '/buscar')

function open() {
  isOpen.value = true
  query.value = ''
}

function close() {
  isOpen.value = false
}

function pick(name: string, code?: string) {
  selectedLabel.value = code ? `${name} · ${code}` : name
  selectedCode.value = code ?? null
  close()
}

const { coords, resume: requestLocation, isSupported: isLocationSupported } = useGeolocation({ immediate: false })
watch(() => coords.value.latitude, (lat) => {
  if (Number.isFinite(lat)) pick('Perto de você')
})

function useCurrentLocation() {
  requestLocation()
  close()
}
</script>

<template>
  <div class="relative z-10 mx-auto -mt-16 max-w-lg px-4 sm:-mt-20 sm:px-6">
    <div class="rounded-[20px] border border-line bg-bg-card p-4 shadow-card sm:p-5">
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-primary-400">
        Em qual região?
      </div>

      <UButton
        block
        color="neutral"
        variant="outline"
        leading-icon="i-lucide-map-pin"
        trailing-icon="i-lucide-chevron-down"
        :label="regionLabel"
        class="mt-2 justify-start font-semibold"
        @click="open"
      />

      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span class="text-ink-faint">Popular:</span>
        <NuxtLink
          v-for="shortcut in POPULAR_SHORTCUTS"
          :key="shortcut.label"
          :to="shortcut.to"
          class="rounded-full border border-line bg-bg-soft px-2.5 py-1 font-semibold text-ink-muted"
        >
          {{ shortcut.label }}
        </NuxtLink>
      </div>

      <UButton
        :to="exploreTo"
        block
        color="primary"
        size="lg"
        label="Explorar profissionais"
        trailing-icon="i-lucide-arrow-right"
        class="mt-4 justify-center font-extrabold"
      />
    </div>

    <UDrawer
      :open="isOpen"
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
              class="w-full"
              autofocus
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

          <div class="flex-1 overflow-y-auto px-2 pb-2">
            <UButton
              v-for="state in suggestions"
              :key="state.code"
              block
              variant="ghost"
              color="neutral"
              :label="`${state.name} · ${state.code}`"
              class="justify-start rounded-xl px-3.5 py-3 text-[13px] font-semibold"
              @click="pick(state.name, state.code)"
            />
          </div>
        </div>
      </template>
    </UDrawer>
  </div>
</template>
