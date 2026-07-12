import { HOME_CATEGORY_SLUGS } from '../components/Home/Categories/config'
import type { CategoryItem } from '../components/Home/Categories/types'
import type { Profession } from '../types'

export function buildCategoryItems(
  professions: Profession[],
  counts: Record<string, number | undefined>,
  slugs: string[]
): CategoryItem[] {
  return slugs
    .map((slug) => {
      const profession = professions.find(p => p.slug === slug)
      if (!profession) return undefined
      return {
        slug: profession.slug,
        label: profession.label,
        icon: profession.icon,
        count: counts[slug] ?? null
      }
    })
    .filter((item): item is CategoryItem => item !== undefined)
}

export function useHomeCategories() {
  const { data: professions } = useProfessions()
  const counts = useCategoryCounts(HOME_CATEGORY_SLUGS)

  const categories = computed(() => buildCategoryItems(
    professions.value ?? [],
    Object.fromEntries(Object.entries(counts).map(([slug, count]) => [slug, count.value])),
    HOME_CATEGORY_SLUGS
  ))

  return { categories }
}
