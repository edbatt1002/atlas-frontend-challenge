import { listProfessions } from '../../services/professionals'
import type { Profession } from '../../types'

export function useProfessions() {
  return useServerQuery<Profession[]>(
    ['professions'],
    () => listProfessions(),
    { staleTime: ONE_HOUR_MS }
  )
}
