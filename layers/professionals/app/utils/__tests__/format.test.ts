import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDistance } from '../format'

describe('formatCurrency', () => {
  it('formats a whole number as BRL with a normal space, no decimals', () => {
    expect(formatCurrency(150)).toBe('R$ 150')
  })

  it('rounds to the nearest whole real', () => {
    expect(formatCurrency(99.9)).toBe('R$ 100')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('R$ 0')
  })
})

describe('formatDistance', () => {
  it('formats sub-kilometer distances in meters', () => {
    expect(formatDistance(0.5)).toBe('500 m')
  })

  it('formats kilometer-or-more distances with one decimal', () => {
    expect(formatDistance(5.2)).toBe('5.2 km')
  })

  it('treats exactly 1km as km, not meters', () => {
    expect(formatDistance(1)).toBe('1.0 km')
  })
})
