import type { Professional } from '../types'

export function buildProfessionalSeoTitle(professional: Professional): string {
  return `${professional.name} · ${professional.profession} em ${professional.location.city}`
}

export function useProfessionalSeo(
  professional: MaybeRefOrGetter<Professional | undefined>,
  isNotFound: MaybeRefOrGetter<boolean>
) {
  usePageSeo({
    title: () => {
      if (toValue(isNotFound)) return 'Profissional não encontrado'
      const current = toValue(professional)
      return current ? buildProfessionalSeoTitle(current) : 'Carregando perfil…'
    },
    description: () => toValue(professional)?.description,
    image: () => toValue(professional)?.cover,
    noindex: () => toValue(isNotFound) || !toValue(professional)
  })
}
