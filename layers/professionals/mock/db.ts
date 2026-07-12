import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { createProfessional } from './factory'

const PROFESSIONAL_COUNT = 600
const SEED = 42

export const db = factory({
  professional: {
    id: primaryKey(String),
    name: String,
    profession: String,
    professionSlug: String,
    cover: String,
    avatar: String,
    price: Number,
    rating: Number,
    reviewsCount: Number,
    online: Boolean,
    verified: Boolean,
    photos: Number,
    videos: Number,
    createdAt: String,
    description: String,
    location: Object,
    gallery: Array,
    media: Array,
    characteristics: Object,
    priceTiers: Array,
    contact: Object,
    stats: Object,
    services: Array,
    availability: Array,
    reviews: Array
  }
})

let seeded = false

export function seedDb() {
  if (seeded) return
  seeded = true

  faker.seed(SEED)
  for (let i = 0; i < PROFESSIONAL_COUNT; i++) {
    db.professional.create(createProfessional(i))
  }
}
