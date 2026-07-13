import { mountSuspended } from '@nuxt/test-utils/runtime'
import CharacteristicsGrid from '../CharacteristicsGrid.vue'
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

describe('ProfessionalProfileCharacteristicsGrid', () => {
  it('renders every characteristic value', async () => {
    const wrapper = await mountSuspended(CharacteristicsGrid, { props: { characteristics } })
    const text = wrapper.text()

    expect(text).toContain('24 anos')
    expect(text).toContain('1.68 m')
    expect(text).toContain('58 kg')
    expect(text).toContain('36')
    expect(text).toContain('Mulher')
    expect(text).toContain('Mulher Cisgênero')
    expect(text).toContain('Possui vagina')
    expect(text).toContain('Ativo - Passivo')
    expect(text).toContain('Faz e recebe penetração')
    expect(text).toContain('Branco')
    expect(text).toContain('Liso')
    expect(text).toContain('Médio')
    expect(text).toContain('Com local')
    expect(text).toContain('PT · EN')
  })
})
