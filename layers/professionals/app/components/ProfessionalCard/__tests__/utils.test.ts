import { getCardPhotos, getSegmentState } from '../utils'

describe('getCardPhotos', () => {
  it('caps the gallery to the max photo count', () => {
    const gallery = ['a', 'b', 'c', 'd', 'e', 'f']

    expect(getCardPhotos(gallery, 4)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('returns the whole gallery when it has fewer photos than the max', () => {
    expect(getCardPhotos(['a', 'b'], 4)).toEqual(['a', 'b'])
  })

  it('returns an empty array for an empty gallery', () => {
    expect(getCardPhotos([], 4)).toEqual([])
  })
})

describe('getSegmentState', () => {
  it('marks the current index as active', () => {
    expect(getSegmentState(2, 2)).toBe('active')
  })

  it('marks earlier indexes as passed', () => {
    expect(getSegmentState(0, 2)).toBe('passed')
    expect(getSegmentState(1, 2)).toBe('passed')
  })

  it('marks later indexes as upcoming', () => {
    expect(getSegmentState(3, 2)).toBe('upcoming')
  })
})
