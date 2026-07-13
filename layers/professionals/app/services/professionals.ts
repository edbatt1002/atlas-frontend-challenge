import type {
  CatalogSummary,
  Profession,
  Professional,
  ProfessionalListParams,
  ProfessionalListResponse
} from '../types'

export async function getCatalogSummary(): Promise<CatalogSummary> {
  return useApi<CatalogSummary>('/api/catalog-summary')
}

export async function listProfessionals(
  params: ProfessionalListParams = {}
): Promise<ProfessionalListResponse> {
  return useApi<ProfessionalListResponse>('/api/professionals', {
    query: params
  })
}

export async function getProfessional(id: string): Promise<Professional> {
  return useApi<Professional>(`/api/professionals/${id}`)
}

export async function listProfessions(): Promise<Profession[]> {
  return useApi<Profession[]>('/api/professions')
}
