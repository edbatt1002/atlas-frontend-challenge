<script setup lang="ts">
import type { GeoPromptEmits } from './types'
import type { ProfessionalSort } from '../../../types'

const emit = defineEmits<GeoPromptEmits>()

const sort = defineModel<ProfessionalSort | undefined>('sort')

const { resume: requestGeolocation, isSupported: isGeolocationSupported } = useGeolocation({ immediate: false })

function onGeoAllow() {
  if (isGeolocationSupported.value) requestGeolocation()
  sort.value = 'nearest'
  emit('geoAllow')
  emit('close')
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center px-8 text-center">
    <div class="flex size-[70px] items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-3xl text-primary-400">
      <UIcon name="i-lucide-map-pin" />
    </div>
    <h3 class="mt-5 font-display text-xl font-extrabold text-ink">
      Usar sua localização?
    </h3>
    <p class="mt-2 max-w-[30ch] text-[13.5px] text-ink-faint">
      Permita o acesso à sua localização para mostrarmos os perfis mais próximos de você.
    </p>
    <UButton
      class="mt-5 w-full max-w-[260px] justify-center"
      color="primary"
      size="lg"
      label="Permitir localização"
      @click="onGeoAllow"
    />
    <UButton
      label="Agora não"
      variant="link"
      color="neutral"
      class="mt-2.5 font-semibold"
      @click="emit('close')"
    />
  </div>
</template>
