import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalProfile from '../ProfessionalProfile.vue'
import { buildProfessional } from '../../../../mock/fixtures'

const professional = buildProfessional({
  description: 'Atendimento premium e discreto no centro de São Paulo.',
  gallery: [],
  media: [
    { url: 'https://example.test/1.jpg', type: 'photo' },
    { url: 'https://example.test/2.jpg', type: 'photo' },
    { url: 'https://example.test/3.jpg', type: 'video' },
    { url: 'https://example.test/4.jpg', type: 'photo' },
    { url: 'https://example.test/5.jpg', type: 'photo' },
    { url: 'https://example.test/6.jpg', type: 'photo' }
  ],
  characteristics: {
    age: 24,
    heightCm: 168,
    hairColor: 'Loiro',
    eyeColor: 'Castanhos',
    attends: 'Homens',
    hasLocal: true,
    languages: ['PT', 'EN'],
    hours: '10h–22h'
  },
  priceTiers: [
    { label: '1 hora', price: 350 },
    { label: '2 horas', price: 600 },
    { label: 'Pernoite', price: 1200 }
  ],
  contact: { telegram: 'valentina_tg', whatsapp: '5511999998888' },
  services: [
    { name: 'Massagem', price: 200 },
    { name: '1 hora', price: 350 }
  ],
  reviews: [
    { author: 'Anônimo', rating: 5, comment: 'Atendimento impecável.', date: '2026-01-10T00:00:00.000Z' }
  ]
})

describe('ProfessionalProfile', () => {
  it('renders name, verified badge, profession, rating and location', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Valentina')
    expect(text).toContain('✓')
    expect(text).toContain('Modelo')
    expect(text).toContain('4.9')
    expect(text).toContain('2.3 km')
  })

  it('shows the online badge only when the professional is online', async () => {
    const online = await mountSuspended(ProfessionalProfile, { props: { professional } })
    expect(online.text()).toContain('ONLINE')

    const offline = await mountSuspended(ProfessionalProfile, {
      props: { professional: { ...professional, online: false } }
    })
    expect(offline.text()).not.toContain('ONLINE')
  })

  it('renders the description, characteristics and each service with its price', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain(professional.description)
    expect(text).toContain('24 anos')
    expect(text).toContain('Massagem')
    expect(text).toContain('R$ 200')
    expect(text).toContain('1 hora')
    expect(text).toContain('R$ 350')
  })

  it('caps the gallery grid and shows an overlay with the remaining count', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })

    expect(wrapper.findAll('img[alt*="galeria"]')).toHaveLength(5)
    expect(wrapper.text()).toContain('+1')
  })

  it('renders each review with author, rating and comment', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Anônimo')
    expect(text).toContain('Atendimento impecável.')
  })

  it('shows the base price and price tiers in the desktop sidebar', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const text = wrapper.text()

    expect(text).toContain('Pernoite')
    expect(text).toContain('R$ 1.200')
  })

  it('links the contact buttons to real Telegram/WhatsApp deep links', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))

    expect(hrefs).toContain('https://t.me/valentina_tg')
    expect(hrefs).toContain('https://wa.me/5511999998888')
  })

  it('links back to the catalog', async () => {
    const wrapper = await mountSuspended(ProfessionalProfile, { props: { professional } })

    expect(wrapper.findAll('a').map(a => a.attributes('href'))).toContain('/buscar')
  })
})
