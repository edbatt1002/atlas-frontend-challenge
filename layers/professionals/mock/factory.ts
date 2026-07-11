import { fakerPT_BR as faker } from '@faker-js/faker'
import { professions } from './professions'
import type {
  Professional,
  ProfessionalAvailability,
  ProfessionalReview,
  ProfessionalService
} from '../app/types'

const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
const slots = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00', '21:00']

function buildAvailability(): ProfessionalAvailability[] {
  const activeDays = faker.helpers.arrayElements(weekdays, { min: 2, max: 6 })
  return activeDays.map(day => ({
    day,
    slots: faker.helpers.arrayElements(slots, { min: 1, max: 4 }).sort()
  }))
}

function buildServices(basePrice: number): ProfessionalService[] {
  const count = faker.number.int({ min: 1, max: 4 })
  return Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    price: Math.round(basePrice * faker.number.float({ min: 0.5, max: 1.6, fractionDigits: 2 }))
  }))
}

function buildReviews(): ProfessionalReview[] {
  const count = faker.number.int({ min: 0, max: 8 })
  return Array.from({ length: count }, () => ({
    author: faker.person.fullName(),
    rating: faker.number.int({ min: 3, max: 5 }),
    comment: faker.lorem.sentence({ min: 6, max: 18 }),
    date: faker.date.past({ years: 1 }).toISOString()
  }))
}

export function createProfessional(index: number): Professional {
  const profession = faker.helpers.arrayElement(professions)
  const sex = faker.person.sexType()
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName()
  const price = faker.number.int({ min: 80, max: 900 })
  const photoSeed = `${profession.slug}-${index}-${firstName}`

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    profession: profession.label,
    professionSlug: profession.slug,
    photo: `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(photoSeed)}`,
    price,
    rating: faker.number.float({ min: 3.2, max: 5, fractionDigits: 1 }),
    reviewsCount: faker.number.int({ min: 0, max: 320 }),
    online: faker.datatype.boolean(0.4),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }, '\n\n'),
    location: {
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      distanceKm: faker.number.float({ min: 0.5, max: 45, fractionDigits: 1 })
    },
    gallery: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }, (_, i) =>
      `https://picsum.photos/seed/${encodeURIComponent(`${photoSeed}-${i}`)}/640/480`
    ),
    services: buildServices(price),
    availability: buildAvailability(),
    reviews: buildReviews()
  }
}
