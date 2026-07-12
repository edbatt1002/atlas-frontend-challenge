import { mountSuspended } from '@nuxt/test-utils/runtime'
import CharacteristicsGrid from '../CharacteristicsGrid.vue'
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

describe('ProfessionalProfileCharacteristicsGrid', () => {
  it('renders every characteristic value', async () => {
    const wrapper = await mountSuspended(CharacteristicsGrid, { props: { characteristics } })
    const text = wrapper.text()

    expect(text).toContain('24 anos')
    expect(text).toContain('1.68 m')
    expect(text).toContain('Loiro')
    expect(text).toContain('Com local')
    expect(text).toContain('PT · EN')
  })
})
