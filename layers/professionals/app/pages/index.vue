<script setup lang="ts">
import { FEATURED_LIMIT } from '../components/Home/FeaturedStrip/config'
import { HOME_CATEGORY_SLUGS } from '../components/Home/Categories/config'

const { data: summary } = useCatalogSummary()
const totalLabel = computed(() => summary.value?.total ? `+${summary.value.total} profissionais verificados` : null)
const categories = computed(() => buildCategoryItems(
  summary.value?.professions ?? [],
  summary.value?.counts ?? {},
  HOME_CATEGORY_SLUGS
))
const { data: featured } = useFeaturedProfessionals(FEATURED_LIMIT)

usePageSeo({
  title: 'Encontre quem combina com você',
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
