import type { ProfessionalSort } from '../../types'

export const SORT_ITEMS: { label: string, value: ProfessionalSort | undefined }[] = [
  { label: 'Destaques', value: undefined },
  { label: 'Novidades', value: 'newest' },
  { label: 'Próximos de mim', value: 'nearest' },
  { label: 'Avaliações', value: 'rating' },
  { label: 'Valor Online', value: 'price' }
]
