import { columnsForBreakpoints } from '../useCatalogGridColumns'

describe('columnsForBreakpoints', () => {
  it('returns 4 at xl', () => {
    expect(columnsForBreakpoints(true, true, true)).toBe(4)
  })

  it('returns 3 at lg', () => {
    expect(columnsForBreakpoints(true, true, false)).toBe(3)
  })

  it('returns 2 at sm', () => {
    expect(columnsForBreakpoints(true, false, false)).toBe(2)
  })

  it('returns 1 below sm', () => {
    expect(columnsForBreakpoints(false, false, false)).toBe(1)
  })
})
