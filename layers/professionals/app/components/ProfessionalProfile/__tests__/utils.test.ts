import { pickMostVisibleSection } from '../utils'

describe('pickMostVisibleSection', () => {
  it('picks the section with the highest intersection ratio', () => {
    const result = pickMostVisibleSection({ fotos: 0.2, sobre: 0.9, aval: 0.1 })

    expect(result).toBe('sobre')
  })

  it('ignores sections with zero ratio', () => {
    expect(pickMostVisibleSection({ fotos: 0, sobre: 0 })).toBeUndefined()
  })

  it('returns undefined for an empty map', () => {
    expect(pickMostVisibleSection({})).toBeUndefined()
  })
})
