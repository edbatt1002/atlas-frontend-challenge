import { columnsForBreakpoints } from '../useCatalogGridColumns'

describe('columnsForBreakpoints', () => {
  it('returns 4 at xl', () => {
    expect(columnsForBreakpoints({ sm: true, lg: true, xl: true })).toBe(4)
  })

  it('returns 3 at lg', () => {
    expect(columnsForBreakpoints({ sm: true, lg: true, xl: false })).toBe(3)
  })

  it('returns 2 at sm', () => {
    expect(columnsForBreakpoints({ sm: true, lg: false, xl: false })).toBe(2)
  })

  it('returns 1 below sm', () => {
    expect(columnsForBreakpoints({ sm: false, lg: false, xl: false })).toBe(1)
  })
})
