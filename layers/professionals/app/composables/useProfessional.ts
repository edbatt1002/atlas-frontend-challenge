import { getProfessional } from '../services/professionals'
import type { Professional } from '../types'

export function useProfessional(id: MaybeRefOrGetter<string>) {
  return useServerQuery<Professional>(
    () => ['professional', toValue(id)],
    () => getProfessional(toValue(id))
  )
}
