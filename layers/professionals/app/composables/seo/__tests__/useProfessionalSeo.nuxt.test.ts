import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { buildProfessionalSeoTitle, useProfessionalSeo } from '../useProfessionalSeo'
import { buildProfessional } from '../../../../mock/fixtures'

const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }))

mockNuxtImport('useSeoMeta', () => seoMeta)

function lastArg() {
  return seoMeta.mock.calls.at(-1)![0]
}

describe('buildProfessionalSeoTitle', () => {
  it('combines name, profession and city into a title', () => {
    const professional = buildProfessional({
      name: 'Valentina',
      profession: 'Modelo',
      location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 }
    })

    expect(buildProfessionalSeoTitle(professional)).toBe('Valentina · Modelo em São Paulo')
  })
})

describe('useProfessionalSeo', () => {
  beforeEach(() => seoMeta.mockClear())

  it('builds title, description and image from the professional', () => {
    const professional = buildProfessional({
      name: 'Ana',
      profession: 'Modelo',
      description: 'bio curta',
      cover: 'cover.jpg',
      location: { city: 'São Paulo', state: 'SP', distanceKm: 1 }
    })

    useProfessionalSeo(professional, false)

    expect(lastArg().title()).toBe('onluxe · Ana · Modelo em São Paulo')
    expect(lastArg().description()).toBe('bio curta')
    expect(lastArg().ogImage()).toBe('cover.jpg')
    expect(lastArg().robots()).toBe('index, follow')
  })

  it('marks a not-found profile as noindex with a fallback title', () => {
    useProfessionalSeo(undefined, true)

    expect(lastArg().title()).toBe('onluxe · Profissional não encontrado')
    expect(lastArg().robots()).toBe('noindex, nofollow')
  })
})
