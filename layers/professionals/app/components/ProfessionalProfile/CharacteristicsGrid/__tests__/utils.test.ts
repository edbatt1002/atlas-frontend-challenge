import { buildCharacteristicItems } from '../utils'
import type { ProfessionalCharacteristics } from '../../../../types'

const characteristics: ProfessionalCharacteristics = {
  age: 24,
  heightCm: 168,
  hairColor: 'Loiro',
  eyeColor: 'Castanhos',
  attends: 'Homens',
  hasLocal: true,
  languages: ['PT', 'EN'],
  hours: '10h–22h'
}

describe('buildCharacteristicItems', () => {
  it('formats each characteristic into a display label/value pair', () => {
    expect(buildCharacteristicItems(characteristics)).toEqual([
      { label: 'IDADE', value: '24 anos' },
      { label: 'ALTURA', value: '1.68 m' },
      { label: 'CABELO', value: 'Loiro' },
      { label: 'OLHOS', value: 'Castanhos' },
      { label: 'ATENDE', value: 'Homens' },
      { label: 'LOCAL', value: 'Com local' },
      { label: 'IDIOMAS', value: 'PT · EN' },
      { label: 'HORÁRIO', value: '10h–22h' }
    ])
  })

  it('shows "Sem local" when hasLocal is false', () => {
    const items = buildCharacteristicItems({ ...characteristics, hasLocal: false })

    expect(items.find(i => i.label === 'LOCAL')?.value).toBe('Sem local')
  })
})
