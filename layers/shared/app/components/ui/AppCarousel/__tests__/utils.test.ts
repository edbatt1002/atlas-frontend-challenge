import { getActiveIndexFromSlideChange } from '../utils'

describe('getActiveIndexFromSlideChange', () => {
  it('returns the active index from the swiper event detail', () => {
    expect(getActiveIndexFromSlideChange([{ activeIndex: 2 }])).toBe(2)
  })

  it('returns undefined when detail is an empty array', () => {
    expect(getActiveIndexFromSlideChange([])).toBeUndefined()
  })

  it('returns undefined when detail is missing', () => {
    expect(getActiveIndexFromSlideChange(undefined)).toBeUndefined()
  })
})
