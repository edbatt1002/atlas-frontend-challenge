import { clampIndex, filterMediaByType } from '../utils'
import type { ProfessionalMedia } from '../../../../types'

const media: ProfessionalMedia[] = [
  { url: '1.jpg', type: 'photo' },
  { url: '2.jpg', type: 'video' },
  { url: '3.jpg', type: 'photo' },
  { url: '4.jpg', type: 'video' }
]

describe('filterMediaByType', () => {
  it('returns everything for "all"', () => {
    expect(filterMediaByType(media, 'all')).toEqual(media)
  })

  it('returns only photos for "photo"', () => {
    expect(filterMediaByType(media, 'photo')).toEqual([media[0], media[2]])
  })

  it('returns only videos for "video"', () => {
    expect(filterMediaByType(media, 'video')).toEqual([media[1], media[3]])
  })
})

describe('clampIndex', () => {
  it('keeps an in-range index unchanged', () => {
    expect(clampIndex(2, 5)).toBe(2)
  })

  it('clamps a negative index to 0', () => {
    expect(clampIndex(-3, 5)).toBe(0)
  })

  it('clamps an out-of-range index to the last item', () => {
    expect(clampIndex(10, 5)).toBe(4)
  })

  it('returns 0 for an empty list', () => {
    expect(clampIndex(3, 0)).toBe(0)
  })
})
