import { listMockProfessionals } from '../../../mock/repository'
import type { ProfessionalListParams, ProfessionalSort } from '../../../app/types'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const params: ProfessionalListParams = {
    profession: typeof query.profession === 'string' ? query.profession : undefined,
    state: typeof query.state === 'string' ? query.state : undefined,
    online: query.online === undefined ? undefined : query.online === 'true',
    min_price: query.min_price === undefined ? undefined : Number(query.min_price),
    max_price: query.max_price === undefined ? undefined : Number(query.max_price),
    min_rating: query.min_rating === undefined ? undefined : Number(query.min_rating),
    sort: typeof query.sort === 'string' ? query.sort as ProfessionalSort : undefined,
    page: query.page === undefined ? undefined : Number(query.page),
    limit: query.limit === undefined ? undefined : Number(query.limit)
  }

  return listMockProfessionals(params)
})
