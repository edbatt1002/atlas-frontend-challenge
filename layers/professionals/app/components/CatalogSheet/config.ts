import type { CatalogFilterSection, ProfessionalSort } from '../../types'

export const SORT_ITEMS: { label: string, value: ProfessionalSort | undefined }[] = [
  { label: 'Destaques', value: undefined },
  { label: 'Novidades', value: 'newest' },
  { label: 'Próximos de mim', value: 'nearest' },
  { label: 'Avaliações', value: 'rating' },
  { label: 'Valor Online', value: 'price' }
]

export const RATING_CHIPS: { label: string, value: number | undefined }[] = [
  { label: 'Todas', value: undefined },
  { label: '4.0+', value: 4 },
  { label: '4.5+', value: 4.5 },
  { label: '4.8+', value: 4.8 }
]

export const FILTER_SECTIONS: { id: CatalogFilterSection, label: string }[] = [
  { id: 'profissao', label: 'Profissão' },
  { id: 'disponibilidade', label: 'Status' },
  { id: 'preco', label: 'Preço' },
  { id: 'avaliacao', label: 'Avaliação' }
]

export const PRICE_MIN = 120
export const PRICE_MAX = 800
export const PRICE_STEP = 20
