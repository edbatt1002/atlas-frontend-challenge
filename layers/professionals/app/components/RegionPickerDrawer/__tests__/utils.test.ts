import { filterStates } from '../utils'

const states = [
  { code: 'SP', name: 'São Paulo' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'MG', name: 'Minas Gerais' }
]

describe('filterStates', () => {
  it('returns every state when the query is empty', () => {
    expect(filterStates(states, '')).toEqual(states)
  })

  it('matches by name, case-insensitively', () => {
    expect(filterStates(states, 'rio')).toEqual([states[1]])
  })

  it('matches by code, case-insensitively', () => {
    expect(filterStates(states, 'mg')).toEqual([states[2]])
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterStates(states, 'zzz')).toEqual([])
  })
})
