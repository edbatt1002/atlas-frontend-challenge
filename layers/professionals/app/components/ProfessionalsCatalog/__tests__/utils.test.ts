import { chunkIntoRows } from '../utils'

describe('chunkIntoRows', () => {
  it('splits items into rows of the given column count', () => {
    expect(chunkIntoRows([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('returns one row when items fit exactly', () => {
    expect(chunkIntoRows([1, 2, 3, 4], 4)).toEqual([[1, 2, 3, 4]])
  })

  it('returns an empty array for an empty list', () => {
    expect(chunkIntoRows([], 3)).toEqual([])
  })

  it('treats a non-positive column count as a single row', () => {
    expect(chunkIntoRows([1, 2, 3], 0)).toEqual([[1, 2, 3]])
  })

  it('handles a single column', () => {
    expect(chunkIntoRows([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })
})
