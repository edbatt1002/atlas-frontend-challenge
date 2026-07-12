import { chunkIntoRows } from '../utils'

describe('chunkIntoRows', () => {
  it('splits items into rows of the given column count', () => {
    expect(chunkIntoRows([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
  })

  it('keeps the last row short when items do not divide evenly', () => {
    expect(chunkIntoRows([1, 2, 3], 2)).toEqual([[1, 2], [3]])
  })

  it('returns one row per item at a single column', () => {
    expect(chunkIntoRows([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  it('returns an empty array for no items', () => {
    expect(chunkIntoRows([], 3)).toEqual([])
  })

  it('falls back to a single row when columns is zero', () => {
    expect(chunkIntoRows([1, 2], 0)).toEqual([[1, 2]])
  })
})
