import { getMockProfessional } from '../../../mock/repository'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const professional = id ? getMockProfessional(id) : undefined

  if (!professional) {
    throw createError({ statusCode: 404, message: 'Professional not found' })
  }

  return professional
})
