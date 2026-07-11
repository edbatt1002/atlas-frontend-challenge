import { listProfessionals } from '../services/professionals'
import type { Professional, ProfessionalListParams, ProfessionalListResponse } from '../types'

export function getNextProfessionalsPage(last: ProfessionalListResponse): number | undefined {
  return last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined
}

export function useProfessionals(filters: MaybeRefOrGetter<ProfessionalListParams> = () => ({})) {
  return useServerInfiniteQuery<ProfessionalListResponse, Professional, number>(
    () => ['professionals', toValue(filters)],
    page => listProfessionals({ ...toValue(filters), page }),
    {
      initialPageParam: 1,
      getNextPageParam: getNextProfessionalsPage,
      selectItems: page => page.data
    }
  )
}
