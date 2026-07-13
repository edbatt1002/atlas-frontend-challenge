import { buildCharacteristicItems } from '../utils'
import type { ProfessionalCharacteristics } from '../../../../types'

const characteristics: ProfessionalCharacteristics = {
  age: 24,
  heightCm: 168,
  weightKg: 58,
  footSize: 36,
  gender: 'Mulher',
  genderDescription: 'Mulher Cisgênero. Nasceu do sexo feminino e identifica-se como mulher.',
  genitals: 'Possui vagina',
  sexualPreference: 'Ativo - Passivo',
  sexualPreferenceDescription: 'Faz e recebe penetração',
  ethnicity: 'Branco',
  hairColor: 'Loiro',
  hairStyle: 'Liso',
  hairLength: 'Médio',
  eyeColor: 'Castanhos',
  hasSilicone: false,
  hasTattoos: false,
  hasPiercings: false,
  smoker: 'Não',
  attends: 'Homens',
  hasLocal: true,
  languages: ['PT', 'EN'],
  hours: '10h–22h'
}

describe('buildCharacteristicItems', () => {
  it('formats each characteristic into a display label/value pair', () => {
    expect(buildCharacteristicItems(characteristics)).toEqual([
      { label: 'Idade', value: '24 anos' },
      { label: 'Gênero', value: 'Mulher', description: characteristics.genderDescription },
      { label: 'Genitália', value: 'Possui vagina' },
      { label: 'Preferência sexual', value: 'Ativo - Passivo', description: 'Faz e recebe penetração' },
      { label: 'Peso', value: '58 kg' },
      { label: 'Altura', value: '1.68 m' },
      { label: 'Etnia', value: 'Branco' },
      { label: 'Cor dos olhos', value: 'Castanhos' },
      { label: 'Estilo de cabelo', value: 'Liso' },
      { label: 'Tamanho de cabelo', value: 'Médio' },
      { label: 'Cor do cabelo', value: 'Loiro' },
      { label: 'Tamanho do pé', value: '36' },
      { label: 'Silicone', value: 'Não' },
      { label: 'Tatuagens', value: 'Não' },
      { label: 'Piercings', value: 'Não' },
      { label: 'Fumante', value: 'Não' },
      { label: 'Idiomas', value: 'PT · EN' },
      { label: 'Atende', value: 'Homens' },
      { label: 'Local', value: 'Com local' },
      { label: 'Horário', value: '10h–22h' }
    ])
  })

  it('shows "Sem local" when hasLocal is false', () => {
    const items = buildCharacteristicItems({ ...characteristics, hasLocal: false })

    expect(items.find(i => i.label === 'Local')?.value).toBe('Sem local')
  })
})
