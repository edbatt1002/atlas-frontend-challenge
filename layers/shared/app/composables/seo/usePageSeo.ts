const SITE_NAME = 'onluxe'
const DEFAULT_DESCRIPTION = 'Perfis verificados, avaliações e disponibilidade em tempo real na sua cidade.'

export interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string | undefined>
  image?: MaybeRefOrGetter<string | undefined>
  noindex?: MaybeRefOrGetter<boolean>
}

export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const origin = useRequestURL().origin

  const fullTitle = () => `${SITE_NAME} · ${toValue(options.title)}`
  const description = () => toValue(options.description) ?? DEFAULT_DESCRIPTION
  const canonicalUrl = () => `${origin}${route.path}`

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: () => toValue(options.image),
    twitterCard: 'summary_large_image',
    robots: () => toValue(options.noindex) ? 'noindex, nofollow' : 'index, follow'
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }]
  })
}
