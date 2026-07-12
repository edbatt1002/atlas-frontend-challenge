import { listProfessionals } from '../services/professionals'

export function useProfessionalTotal() {
  return useServerQuery<number>(
    ['professionals-total'],
    async () => (await listProfessionals({ limit: 1 })).meta.total,
    { staleTime: 1000 * 60 * 60 }
  )
}
