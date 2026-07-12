import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { usePageSeo } from '../usePageSeo'

const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }))

mockNuxtImport('useSeoMeta', () => seoMeta)

function lastArg() {
  return seoMeta.mock.calls.at(-1)![0]
}

describe('usePageSeo', () => {
  beforeEach(() => seoMeta.mockClear())

  it('prefixes the title with the site name', () => {
    usePageSeo({ title: 'Buscar' })

    expect(lastArg().title()).toBe('onluxe · Buscar')
    expect(lastArg().ogTitle()).toBe('onluxe · Buscar')
  })

  it('falls back to the default description', () => {
    usePageSeo({ title: 'X' })

    expect(lastArg().description()).toContain('Perfis verificados')
  })

  it('passes provided description and image through', () => {
    usePageSeo({ title: 'A', description: 'desc', image: 'img.jpg' })

    expect(lastArg().ogDescription()).toBe('desc')
    expect(lastArg().ogImage()).toBe('img.jpg')
  })

  it('defaults robots to index and switches to noindex when requested', () => {
    usePageSeo({ title: 'X' })
    expect(lastArg().robots()).toBe('index, follow')

    usePageSeo({ title: 'X', noindex: true })
    expect(lastArg().robots()).toBe('noindex, nofollow')
  })
})
