import { professionalPath, slugify } from '../slug'

describe('slugify', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(slugify('Valentina Silva')).toBe('valentina-silva')
  })

  it('strips accents and diacritics', () => {
    expect(slugify('Antônia Conceição')).toBe('antonia-conceicao')
  })

  it('collapses non-alphanumeric runs into a single hyphen', () => {
    expect(slugify('Ana   &  Júlia!!')).toBe('ana-julia')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  --João--  ')).toBe('joao')
  })

  it('returns an empty string when nothing survives', () => {
    expect(slugify('★★★')).toBe('')
  })
})

describe('professionalPath', () => {
  it('builds an /{id}/{slug} path', () => {
    expect(professionalPath('abc-123', 'Valentina Silva')).toBe('/abc-123/valentina-silva')
  })

  it('falls back to /{id} when the name yields no slug', () => {
    expect(professionalPath('abc-123', '★')).toBe('/abc-123')
  })
})
