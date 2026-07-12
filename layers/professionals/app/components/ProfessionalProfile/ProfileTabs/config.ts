export const PROFILE_SECTIONS = [
  { id: 'fotos', label: 'Fotos e vídeos' },
  { id: 'sobre', label: 'Sobre mim' },
  { id: 'aval', label: 'Avaliações' }
] as const

export type ProfileSectionId = typeof PROFILE_SECTIONS[number]['id']
