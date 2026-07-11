import { getNextProfessionalsPage } from '../useProfessionals'
import type { ProfessionalListResponse } from '../../types'

function response(page: number, totalPages: number): ProfessionalListResponse {
  return { data: [], meta: { page, limit: 24, total: totalPages * 24, totalPages } }
}

describe('getNextProfessionalsPage', () => {
  it('returns the next page number while more pages remain', () => {
    expect(getNextProfessionalsPage(response(1, 5))).toBe(2)
    expect(getNextProfessionalsPage(response(4, 5))).toBe(5)
  })

  it('returns undefined on the last page', () => {
    expect(getNextProfessionalsPage(response(5, 5))).toBeUndefined()
  })

  it('returns undefined when there is a single page', () => {
    expect(getNextProfessionalsPage(response(1, 1))).toBeUndefined()
  })
})
