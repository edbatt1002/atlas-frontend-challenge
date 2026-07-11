import { getGalleryDisplay } from '../utils'

describe('getGalleryDisplay', () => {
  it('returns all photos with no extra count when under the limit', () => {
    const gallery = ['a.jpg', 'b.jpg']

    expect(getGalleryDisplay(gallery, 5)).toEqual({ photos: gallery, extraCount: 0 })
  })

  it('returns all photos with no extra count when exactly at the limit', () => {
    const gallery = ['a.jpg', 'b.jpg', 'c.jpg']

    expect(getGalleryDisplay(gallery, 3)).toEqual({ photos: gallery, extraCount: 0 })
  })

  it('caps photos and reports how many were left out when over the limit', () => {
    const gallery = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg']

    expect(getGalleryDisplay(gallery, 5)).toEqual({
      photos: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg'],
      extraCount: 1
    })
  })
})
