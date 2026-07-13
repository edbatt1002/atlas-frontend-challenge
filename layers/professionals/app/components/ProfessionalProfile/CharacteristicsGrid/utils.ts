import type { ProfessionalCharacteristics } from '../../../types'

export interface CharacteristicItem {
  label: string
  value: string
  description?: string
}

function yesNo(value: boolean): string {
  return value ? 'Sim' : 'Não'
}

export function buildCharacteristicItems(characteristics: ProfessionalCharacteristics): CharacteristicItem[] {
  return [
    { label: 'Idade', value: `${characteristics.age} anos` },
    { label: 'Gênero', value: characteristics.gender, description: characteristics.genderDescription },
    { label: 'Genitália', value: characteristics.genitals },
    { label: 'Preferência sexual', value: characteristics.sexualPreference, description: characteristics.sexualPreferenceDescription },
    { label: 'Peso', value: `${characteristics.weightKg} kg` },
    { label: 'Altura', value: `${(characteristics.heightCm / 100).toFixed(2)} m` },
    { label: 'Etnia', value: characteristics.ethnicity },
    { label: 'Cor dos olhos', value: characteristics.eyeColor },
    { label: 'Estilo de cabelo', value: characteristics.hairStyle },
    { label: 'Tamanho de cabelo', value: characteristics.hairLength },
    { label: 'Cor do cabelo', value: characteristics.hairColor },
    { label: 'Tamanho do pé', value: `${characteristics.footSize}` },
    { label: 'Silicone', value: yesNo(characteristics.hasSilicone) },
    { label: 'Tatuagens', value: yesNo(characteristics.hasTattoos) },
    { label: 'Piercings', value: yesNo(characteristics.hasPiercings) },
    { label: 'Fumante', value: characteristics.smoker },
    { label: 'Idiomas', value: characteristics.languages.join(' · ') },
    { label: 'Atende', value: characteristics.attends },
    { label: 'Local', value: characteristics.hasLocal ? 'Com local' : 'Sem local' },
    { label: 'Horário', value: characteristics.hours }
  ]
}
