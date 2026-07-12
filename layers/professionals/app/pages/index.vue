<script setup lang="ts">
import { FEATURED_LIMIT } from '../components/Home/FeaturedStrip/config'

const { data: total } = useProfessionalTotal()
const totalLabel = computed(() => total.value ? `+${total.value} profissionais verificados` : null)

const { categories } = useHomeCategories()
const { data: featured } = useFeaturedProfessionals(FEATURED_LIMIT)

useSeoMeta({
  title: 'onluxe · Encontre quem combina com você',
  description: 'Perfis reais, avaliações e disponibilidade em tempo real na sua cidade.'
})
</script>

<template>
  <div>
    <HomeHero :total-label="totalLabel" />
    <HomeRegionSearch />
    <HomeCategories :categories="categories" />
    <HomeFeaturedStrip :professionals="featured ?? []" />
    <HomeHowItWorks />
    <HomeBottomCta />
  </div>
</template>
