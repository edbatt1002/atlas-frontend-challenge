import type { ProfileSectionId } from './ProfileTabs/config'
import { pickMostVisibleSection } from './utils'

export function useProfileScrollSpy(sectionIds: ProfileSectionId[], rootMargin: MaybeRefOrGetter<string>) {
  const sectionRefs = reactive<Partial<Record<ProfileSectionId, HTMLElement>>>({})
  const sectionRatios = reactive<Partial<Record<ProfileSectionId, number>>>({})
  const activeSection = ref<ProfileSectionId>(sectionIds[0]!)

  function setSectionRef(id: ProfileSectionId) {
    return (el: unknown) => {
      sectionRefs[id] = (el as HTMLElement | null) ?? undefined
    }
  }

  useIntersectionObserver(
    () => sectionIds.map(id => sectionRefs[id]).filter((el): el is HTMLElement => el != null),
    (entries) => {
      for (const entry of entries) {
        const id = sectionIds.find(sectionId => sectionRefs[sectionId] === entry.target)
        if (id) sectionRatios[id] = entry.intersectionRatio
      }

      const best = pickMostVisibleSection(sectionRatios)
      if (best) activeSection.value = best
    },
    { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
  )

  const { arrivedState } = useScroll(window, { throttle: SCROLL_THROTTLE_MS })
  watch(() => arrivedState.bottom, (atBottom) => {
    const isScrollable = document.documentElement.scrollHeight > window.innerHeight
    if (atBottom && isScrollable) activeSection.value = sectionIds[sectionIds.length - 1]!
  })

  function scrollToSection(id: ProfileSectionId) {
    sectionRefs[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { activeSection, sectionRefs, setSectionRef, scrollToSection }
}
