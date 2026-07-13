import type { State } from './types'

export function filterStates(states: State[], query: string): State[] {
  const q = query.trim().toLowerCase()
  if (!q) return states
  return states.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
}
