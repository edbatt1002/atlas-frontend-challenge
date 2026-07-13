import { listProfessionals } from '../../services/professionals'

export function useProfessionalTotal() {
  return useServerQuery<number>(
    ['professionals-total'],
    async () => (await listProfessionals({ limit: 1 })).meta.total,
    { staleTime: ONE_HOUR_MS }
  )
}
