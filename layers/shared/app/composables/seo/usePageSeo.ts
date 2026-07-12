const SITE_NAME = 'onluxe'
const DEFAULT_DESCRIPTION = 'Perfis verificados, avaliações e disponibilidade em tempo real na sua cidade.'

export interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string | undefined>
  image?: MaybeRefOrGetter<string | undefined>
  noindex?: MaybeRefOrGetter<boolean>
}

export function usePageSeo(options: PageSeoOptions) {
  const fullTitle = () => `${SITE_NAME} · ${toValue(options.title)}`
  const description = () => toValue(options.description) ?? DEFAULT_DESCRIPTION

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: () => toValue(options.image),
    twitterCard: 'summary_large_image',
    robots: () => toValue(options.noindex) ? 'noindex, nofollow' : 'index, follow'
  })
}
