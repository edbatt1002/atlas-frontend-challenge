import { getInitials } from '../utils'

describe('getInitials', () => {
  it('uses the first letter for a single name', () => {
    expect(getInitials('Valentina')).toBe('V')
  })

  it('combines the first and last word initials', () => {
    expect(getInitials('Maria Eduarda Costa')).toBe('MC')
  })

  it('uppercases the initials', () => {
    expect(getInitials('ana lima')).toBe('AL')
  })

  it('falls back to a placeholder for an empty name', () => {
    expect(getInitials('   ')).toBe('?')
  })
})
