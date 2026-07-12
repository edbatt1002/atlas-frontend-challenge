import { getGalleryDisplay } from '../utils'
import type { ProfessionalMedia } from '../../../../types'

function media(count: number): ProfessionalMedia[] {
  return Array.from({ length: count }, (_, i) => ({ url: `${i}.jpg`, type: 'photo' as const }))
}

describe('getGalleryDisplay', () => {
  it('returns all items with no extra count when under the limit', () => {
    const items = media(2)

    expect(getGalleryDisplay(items, 5)).toEqual({ items, extraCount: 0 })
  })

  it('returns all items with no extra count when exactly at the limit', () => {
    const items = media(3)

    expect(getGalleryDisplay(items, 3)).toEqual({ items, extraCount: 0 })
  })

  it('caps items and reports how many were left out when over the limit', () => {
    const items = media(6)

    expect(getGalleryDisplay(items, 5)).toEqual({
      items: items.slice(0, 5),
      extraCount: 1
    })
  })
})
