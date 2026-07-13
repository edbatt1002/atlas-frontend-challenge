export const TYPE_FILTERS = [
  { label: 'Todas', value: 'all' as const },
  { label: 'Fotos', value: 'photo' as const },
  { label: 'Vídeos', value: 'video' as const }
]

export type MediaTypeFilter = typeof TYPE_FILTERS[number]['value']

export const FEED_VISIBILITY_THRESHOLD = 0.6
