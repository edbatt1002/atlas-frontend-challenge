import { listProfessionals } from '../../services/professionals'

export function useCategoryCounts(slugs: string[]) {
  return Object.fromEntries(slugs.map((slug) => {
    const { data } = useServerQuery(
      ['category-count', slug],
      async () => (await listProfessionals({ profession: slug, limit: 1 })).meta.total,
      { staleTime: 1000 * 60 * 60 }
    )
    return [slug, data]
  }))
}
