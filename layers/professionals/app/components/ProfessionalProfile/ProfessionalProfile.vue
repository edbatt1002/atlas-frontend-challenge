<script setup lang="ts">
import type { ProfessionalProfileProps } from './types'
import type { ProfileSectionId } from './ProfileTabs/config'

defineProps<ProfessionalProfileProps>()

const headerHeight = useHeaderHeight()
const tabsHeight = useProfileTabsHeight()
const tabsTopOffset = computed(() => headerHeight.value)
const sectionScrollMarginTop = computed(() => headerHeight.value + tabsHeight.value + 12)

const sectionRefs = reactive<Partial<Record<ProfileSectionId, HTMLElement>>>({})
const activeSection = ref<ProfileSectionId>('fotos')

function setSectionRef(id: ProfileSectionId) {
  return (el: unknown) => {
    sectionRefs[id] = (el as HTMLElement | null) ?? undefined
  }
}

const SECTION_IDS: ProfileSectionId[] = ['fotos', 'sobre', 'aval']
SECTION_IDS.forEach((id) => {
  useIntersectionObserver(
    () => sectionRefs[id],
    ([entry]) => {
      if (entry?.isIntersecting) activeSection.value = id
    },
    { rootMargin: computed(() => `-${sectionScrollMarginTop.value}px 0px -60% 0px`) }
  )
})

function scrollToSection(id: ProfileSectionId) {
  sectionRefs[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-[1180px]">
      <ProfessionalProfileCover
        :cover-url="professional.cover"
        :name="professional.name"
      />

      <ProfessionalProfileIdentityHeader
        :avatar-url="professional.avatar"
        :name="professional.name"
        :profession="professional.profession"
        :verified="professional.verified"
        :online="professional.online"
        :rating="professional.rating"
        :reviews-count="professional.reviewsCount"
        :location="professional.location"
      />

      <ProfessionalProfileContactButtons
        :contact="professional.contact"
        class="mt-4 px-4 sm:px-6"
      />
    </div>

    <ProfessionalProfileProfileTabs
      :active="activeSection"
      :top-offset="tabsTopOffset"
      class="mt-5"
      @select="scrollToSection"
    />

    <div class="mx-auto max-w-[1180px]">
      <div class="grid gap-6 pb-28 lg:grid-cols-[1fr_320px] lg:items-start lg:pb-10">
        <div class="min-w-0">
          <div class="flex flex-col gap-6 px-4 py-5 sm:px-6">
            <div
              :ref="setSectionRef('fotos')"
              :style="{ scrollMarginTop: `${sectionScrollMarginTop}px` }"
            >
              <ProfessionalProfileGallerySection
                :media="professional.media"
                :name="professional.name"
                @open="openLightbox"
              />
            </div>

            <div
              :ref="setSectionRef('sobre')"
              :style="{ scrollMarginTop: `${sectionScrollMarginTop}px` }"
            >
              <h2 class="font-display text-base font-bold text-ink">
                Sobre mim
              </h2>
              <p class="mt-2 text-sm leading-relaxed text-ink-muted">
                {{ professional.description }}
              </p>

              <ProfessionalProfileCharacteristicsGrid
                :characteristics="professional.characteristics"
                class="mt-6"
              />

              <h2 class="mt-6 font-display text-base font-bold text-ink lg:hidden">
                Valores
              </h2>
              <ProfessionalProfilePriceTiers
                :tiers="professional.priceTiers"
                class="mt-2 lg:hidden"
              />

              <h2 class="mt-6 font-display text-base font-bold text-ink">
                Serviços
              </h2>
              <div class="mt-2 flex flex-wrap gap-2">
                <UBadge
                  v-for="service in professional.services"
                  :key="service.name"
                  :label="`${service.name} · ${formatCurrency(service.price)}`"
                  color="neutral"
                  variant="outline"
                  size="lg"
                  class="rounded-[12px] font-semibold"
                />
              </div>
            </div>

            <div
              :ref="setSectionRef('aval')"
              :style="{ scrollMarginTop: `${sectionScrollMarginTop}px` }"
            >
              <ProfessionalProfileReviewsList :reviews="professional.reviews" />
            </div>
          </div>
        </div>

        <ProfessionalProfileVerificationSidebar
          :base-price="professional.price"
          :price-tiers="professional.priceTiers"
          :contact="professional.contact"
          :verified="professional.verified"
          :stats="professional.stats"
          class="hidden px-4 sm:px-6 lg:sticky lg:top-24 lg:block"
        />
      </div>
    </div>

    <ProfessionalProfileMobileStickyBar
      :price="professional.price"
      :contact="professional.contact"
    />

    <ProfessionalProfileGalleryLightbox
      :open="lightboxOpen"
      :media="professional.media"
      :initial-index="lightboxIndex"
      :name="professional.name"
      @close="lightboxOpen = false"
    />
  </div>
</template>
