import type { ProfessionalCharacteristics } from '../../../types'

export interface CharacteristicItem {
  label: string
  value: string
}

export function buildCharacteristicItems(characteristics: ProfessionalCharacteristics): CharacteristicItem[] {
  return [
    { label: 'IDADE', value: `${characteristics.age} anos` },
    { label: 'ALTURA', value: `${(characteristics.heightCm / 100).toFixed(2)} m` },
    { label: 'CABELO', value: characteristics.hairColor },
    { label: 'OLHOS', value: characteristics.eyeColor },
    { label: 'ATENDE', value: characteristics.attends },
    { label: 'LOCAL', value: characteristics.hasLocal ? 'Com local' : 'Sem local' },
    { label: 'IDIOMAS', value: characteristics.languages.join(' · ') },
    { label: 'HORÁRIO', value: characteristics.hours }
  ]
}
