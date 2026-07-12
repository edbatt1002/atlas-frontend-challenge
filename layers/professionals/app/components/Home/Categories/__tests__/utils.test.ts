import { pickCategories } from '../utils'
import type { Profession } from '../../../../types'

const professions: Profession[] = [
  { label: 'Acompanhante', slug: 'acompanhante', icon: 'i-lucide-heart' },
  { label: 'Modelo', slug: 'modelo', icon: 'i-lucide-camera' },
  { label: 'DJ', slug: 'dj', icon: 'i-lucide-disc-3' }
]

describe('pickCategories', () => {
  it('returns professions matching the requested slugs, in the requested order', () => {
    expect(pickCategories(professions, ['modelo', 'acompanhante'])).toEqual([
      professions[1],
      professions[0]
    ])
  })

  it('skips slugs with no matching profession', () => {
    expect(pickCategories(professions, ['acompanhante', 'does-not-exist'])).toEqual([
      professions[0]
    ])
  })

  it('returns an empty array when given no professions', () => {
    expect(pickCategories([], ['acompanhante'])).toEqual([])
  })
})
