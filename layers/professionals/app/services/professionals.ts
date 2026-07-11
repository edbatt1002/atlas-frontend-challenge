import type {
  Profession,
  Professional,
  ProfessionalListParams,
  ProfessionalListResponse
} from '../types'

export async function listProfessionals(
  params: ProfessionalListParams = {}
): Promise<ProfessionalListResponse> {
  const { data, error } = await useApi<ProfessionalListResponse>('/api/professionals', {
    query: params
  })
  if (error) throw error
  return data
}

export async function getProfessional(id: string): Promise<Professional> {
  const { data, error } = await useApi<Professional>(`/api/professionals/${id}`)
  if (error) throw error
  return data
}

export async function listProfessions(): Promise<Profession[]> {
  const { data, error } = await useApi<Profession[]>('/api/professions')
  if (error) throw error
  return data
}
