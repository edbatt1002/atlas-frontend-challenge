import { buildProfessionalSeoTitle } from '../useProfessionalSeo'
import { buildProfessional } from '../../../../mock/fixtures'

describe('buildProfessionalSeoTitle', () => {
  it('combines name, profession and city into a title', () => {
    const professional = buildProfessional({
      name: 'Valentina',
      profession: 'Modelo',
      location: { city: 'São Paulo', state: 'SP', distanceKm: 2.3 }
    })

    expect(buildProfessionalSeoTitle(professional)).toBe('Valentina · Modelo em São Paulo')
  })
})
