import { listProfessionals } from '../services/professionals'
import type { Professional } from '../types'

export function useFeaturedProfessionals(limit: number) {
  return useServerQuery<Professional[]>(
    ['featured-professionals', limit],
    async () => (await listProfessionals({ sort: 'featured', limit })).data,
    { staleTime: 1000 * 60 * 5 }
  )
}
