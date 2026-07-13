import { listMockProfessionals, parseProfessionalListParams } from '../../../mock/repository'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const params = parseProfessionalListParams((key) => {
    const value = query[key]
    return typeof value === 'string' ? value : undefined
  })

  return listMockProfessionals(params)
})
