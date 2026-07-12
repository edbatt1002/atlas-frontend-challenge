import { getNextCarouselIndex, getPrevCarouselIndex } from '../utils'

describe('getPrevCarouselIndex', () => {
  it('moves one slide back', () => {
    expect(getPrevCarouselIndex(2)).toBe(1)
  })

  it('does not go below the first slide', () => {
    expect(getPrevCarouselIndex(0)).toBe(0)
  })
})

describe('getNextCarouselIndex', () => {
  it('moves one slide forward', () => {
    expect(getNextCarouselIndex(1, 5)).toBe(2)
  })

  it('does not go past the last slide', () => {
    expect(getNextCarouselIndex(4, 5)).toBe(4)
  })
})
