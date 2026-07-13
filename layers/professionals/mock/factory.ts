import { fakerPT_BR as faker } from '@faker-js/faker'
import { professions } from './professions'
import { getProfessionalImageSet } from './imageSets'
import { getServiceNamesFor } from './serviceCatalog'
import type {
  Professional,
  ProfessionalAvailability,
  ProfessionalCharacteristics,
  ProfessionalContact,
  ProfessionalMedia,
  ProfessionalPriceTier,
  ProfessionalReview,
  ProfessionalStats
} from '../app/types'

const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
const slots = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00', '21:00']
const HAIR_COLORS = ['Loiro', 'Castanho', 'Preto', 'Ruivo', 'Grisalho']
const HAIR_STYLES = ['Liso', 'Cacheado', 'Ondulado', 'Crespo']
const HAIR_LENGTHS = ['Curto', 'Médio', 'Longo']
const EYE_COLORS = ['Castanhos', 'Verdes', 'Azuis', 'Mel', 'Pretos']
const ETHNICITY_OPTIONS = ['Branco', 'Pardo', 'Negro', 'Asiático', 'Indígena']
const SMOKER_OPTIONS = ['Sim', 'Não', 'Não informado']
const ATTENDS_OPTIONS = ['Homens', 'Mulheres', 'Casais', 'Todos']
const LANGUAGE_POOL = ['PT', 'EN', 'ES', 'FR']
const RESPONSE_TIME_OPTIONS = ['~5 min', '~15 min', '~30 min', '~1 hora']

const GENDER_OPTIONS = [
  { label: 'Mulher', description: 'Mulher Cisgênero. Nasceu do sexo feminino e identifica-se como mulher.', genitals: 'Possui vagina' },
  { label: 'Homem', description: 'Homem Cisgênero. Nasceu do sexo masculino e identifica-se como homem.', genitals: 'Possui pênis' },
  { label: 'Trans', description: 'Mulher Trans. Nasceu do sexo masculino e identifica-se como mulher.', genitals: 'Possui pênis' }
]

const SEXUAL_PREFERENCE_OPTIONS = [
  { label: 'Ativo', description: 'Faz penetração' },
  { label: 'Passivo', description: 'Recebe penetração' },
  { label: 'Ativo - Passivo', description: 'Faz e recebe penetração' }
]

function buildAvailability(): ProfessionalAvailability[] {
  const activeDays = faker.helpers.arrayElements(weekdays, { min: 2, max: 6 })
  return activeDays.map(day => ({
    day,
    slots: faker.helpers.arrayElements(slots, { min: 1, max: 4 }).sort()
  }))
}

function buildServices(professionSlug: string): string[] {
  const names = getServiceNamesFor(professionSlug)
  const count = faker.number.int({ min: Math.min(5, names.length), max: names.length })
  return faker.helpers.arrayElements(names, count)
}

function buildReviews(): ProfessionalReview[] {
  const count = faker.number.int({ min: 3, max: 8 })
  return Array.from({ length: count }, () => ({
    author: faker.person.fullName(),
    rating: faker.number.int({ min: 3, max: 5 }),
    comment: faker.lorem.sentence({ min: 6, max: 18 }),
    date: faker.date.past({ years: 1 }).toISOString()
  }))
}

function buildMedia(gallery: string[]): ProfessionalMedia[] {
  const count = faker.number.int({ min: 4, max: 12 })
  return Array.from({ length: count }, (_, i) => ({
    url: gallery[i % gallery.length]!,
    type: faker.datatype.boolean(0.2) ? 'video' as const : 'photo' as const
  }))
}

function buildCharacteristics(): ProfessionalCharacteristics {
  const gender = faker.helpers.arrayElement(GENDER_OPTIONS)
  const sexualPreference = faker.helpers.arrayElement(SEXUAL_PREFERENCE_OPTIONS)

  return {
    age: faker.number.int({ min: 20, max: 45 }),
    heightCm: faker.number.int({ min: 155, max: 190 }),
    weightKg: faker.number.int({ min: 48, max: 95 }),
    footSize: faker.number.int({ min: 34, max: 44 }),
    gender: gender.label,
    genderDescription: gender.description,
    genitals: gender.genitals,
    sexualPreference: sexualPreference.label,
    sexualPreferenceDescription: sexualPreference.description,
    ethnicity: faker.helpers.arrayElement(ETHNICITY_OPTIONS),
    hairColor: faker.helpers.arrayElement(HAIR_COLORS),
    hairStyle: faker.helpers.arrayElement(HAIR_STYLES),
    hairLength: faker.helpers.arrayElement(HAIR_LENGTHS),
    eyeColor: faker.helpers.arrayElement(EYE_COLORS),
    hasSilicone: faker.datatype.boolean(0.15),
    hasTattoos: faker.datatype.boolean(0.35),
    hasPiercings: faker.datatype.boolean(0.25),
    smoker: faker.helpers.arrayElement(SMOKER_OPTIONS),
    attends: faker.helpers.arrayElement(ATTENDS_OPTIONS),
    hasLocal: faker.datatype.boolean(0.6),
    languages: faker.helpers.arrayElements(LANGUAGE_POOL, { min: 1, max: 3 }),
    hours: `${faker.number.int({ min: 8, max: 12 })}h–${faker.number.int({ min: 18, max: 23 })}h`
  }
}

function buildPriceTiers(basePrice: number): ProfessionalPriceTier[] {
  return [
    { label: '1 hora', price: basePrice },
    { label: '2 horas', price: Math.round(basePrice * 1.7) },
    { label: 'Pernoite', price: Math.round(basePrice * 3.4) }
  ]
}

function buildContact(): ProfessionalContact {
  return {
    ...(faker.datatype.boolean(0.7) ? { telegram: faker.internet.username() } : {}),
    ...(faker.datatype.boolean(0.9) ? { whatsapp: faker.phone.number({ style: 'international' }).replace(/[^\d]/g, '') } : {})
  }
}

function buildStats(createdAt: string): ProfessionalStats {
  return {
    lastActivity: faker.datatype.boolean(0.4) ? 'Agora' : `Há ${faker.number.int({ min: 1, max: 12 })}h`,
    responseTime: faker.helpers.arrayElement(RESPONSE_TIME_OPTIONS),
    memberSince: new Date(createdAt).getFullYear().toString()
  }
}

export function createProfessional(index: number): Professional {
  const profession = faker.helpers.arrayElement(professions)
  const sex = faker.person.sexType()
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName()
  const price = faker.number.int({ min: 80, max: 900 })
  const imageSet = getProfessionalImageSet(index)
  const createdAt = faker.date.past({ years: 2 }).toISOString()

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    profession: profession.label,
    professionSlug: profession.slug,
    cover: imageSet.cover,
    avatar: imageSet.avatar,
    price,
    rating: faker.number.float({ min: 3.2, max: 5, fractionDigits: 1 }),
    reviewsCount: faker.number.int({ min: 0, max: 320 }),
    online: faker.datatype.boolean(0.4),
    verified: faker.datatype.boolean(0.6),
    photos: faker.number.int({ min: 4, max: 60 }),
    videos: faker.number.int({ min: 0, max: 12 }),
    createdAt,
    description: faker.lorem.paragraphs({ min: 3, max: 5 }, '\n\n'),
    location: {
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      distanceKm: faker.number.float({ min: 0.5, max: 45, fractionDigits: 1 })
    },
    gallery: imageSet.gallery,
    media: buildMedia(imageSet.gallery),
    characteristics: buildCharacteristics(),
    priceTiers: buildPriceTiers(price),
    contact: buildContact(),
    stats: buildStats(createdAt),
    services: buildServices(profession.slug),
    availability: buildAvailability(),
    reviews: buildReviews()
  }
}
