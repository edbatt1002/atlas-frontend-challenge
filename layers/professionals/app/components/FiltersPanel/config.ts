import type { ProfessionalSort } from '../../types'

export const SORT_ITEMS: { label: string, value: ProfessionalSort | undefined }[] = [
  { label: 'Destaques', value: undefined },
  { label: 'Novidades', value: 'novidades' },
  { label: 'Próximos de mim', value: 'distancia' },
  { label: 'Avaliações', value: 'avaliacao' },
  { label: 'Valor Online', value: 'valor' }
]
