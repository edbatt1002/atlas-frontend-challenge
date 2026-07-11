import type { ProfessionalSort } from '../../types'

export const SORT_ITEMS: { label: string, value: ProfessionalSort | undefined }[] = [
  { label: 'Relevância', value: undefined },
  { label: 'Menor preço', value: 'price_asc' },
  { label: 'Maior preço', value: 'price_desc' },
  { label: 'Melhor avaliação', value: 'rating_desc' },
  { label: 'Mais próximo', value: 'distance_asc' },
  { label: 'Nome (A–Z)', value: 'name_asc' }
]
