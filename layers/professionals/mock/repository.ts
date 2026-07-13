import { db, seedDb } from './db'
import { professions } from './professions'
import type {
  CatalogSummary,
  Professional,
  ProfessionalListParams,
  ProfessionalListResponse,
  ProfessionalSort,
  ProfessionalSummary
} from '../app/types'

const sortComparators: Record<ProfessionalSort, (a: Professional, b: Professional) => number> = {
  featured: (a, b) => Number(b.online) - Number(a.online) || b.rating - a.rating,
  newest: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  nearest: (a, b) => a.location.distanceKm - b.location.distanceKm,
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.price - b.price
}

const filterPredicates = {
  profession: (value: string, professional: Professional) => professional.professionSlug === value,
  state: (value: string, professional: Professional) => professional.location.state === value,
  online: (value: boolean, professional: Professional) => professional.online === value,
  min_price: (value: number, professional: Professional) => professional.price >= value,
  max_price: (value: number, professional: Professional) => professional.price <= value,
  min_rating: (value: number, professional: Professional) => professional.rating >= value
} satisfies Record<string, (value: never, professional: Professional) => boolean>

export function toProfessionalSummary(professional: Professional): ProfessionalSummary {
  return {
    id: professional.id,
    name: professional.name,
    profession: professional.profession,
    professionSlug: professional.professionSlug,
    gallery: professional.gallery.slice(0, 4),
    photos: professional.photos,
    videos: professional.videos,
    online: professional.online,
    verified: professional.verified,
    price: professional.price,
    rating: professional.rating,
    description: professional.description,
    location: {
      city: professional.location.city,
      state: professional.location.state,
      distanceKm: professional.location.distanceKm
    }
  }
}

export function listMockProfessionals(params: ProfessionalListParams = {}): ProfessionalListResponse {
  seedDb()
  const page = Math.max(1, Number(params.page ?? 1))
  const limit = Math.max(1, Number(params.limit ?? 24))
  let results = db.professional.getAll() as Professional[]

  for (const [key, rawValue] of Object.entries(params)) {
    if (rawValue === undefined || !(key in filterPredicates)) continue
    const predicate = filterPredicates[key as keyof typeof filterPredicates] as (
      value: string | number | boolean,
      professional: Professional
    ) => boolean
    results = results.filter(professional => predicate(rawValue, professional))
  }

  results = [...results].sort(sortComparators[params.sort ?? 'featured'])

  const total = results.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit

  return {
    data: results.slice(start, start + limit).map(toProfessionalSummary),
    meta: { page: safePage, limit, total, totalPages }
  }
}

export function parseProfessionalListParams(get: (key: string) => string | undefined): ProfessionalListParams {
  const online = get('online')
  const minPrice = get('min_price')
  const maxPrice = get('max_price')
  const minRating = get('min_rating')
  const page = get('page')
  const limit = get('limit')

  return {
    profession: get('profession') || undefined,
    state: get('state') || undefined,
    online: online === undefined ? undefined : online === 'true',
    min_price: minPrice === undefined ? undefined : Number(minPrice),
    max_price: maxPrice === undefined ? undefined : Number(maxPrice),
    min_rating: minRating === undefined ? undefined : Number(minRating),
    sort: (get('sort') as ProfessionalSort) || undefined,
    page: page === undefined ? undefined : Number(page),
    limit: limit === undefined ? undefined : Number(limit)
  }
}

export function getMockProfessional(id: string): Professional | undefined {
  seedDb()
  return db.professional.findFirst({ where: { id: { equals: id } } }) as Professional | undefined
}

export function getMockCatalogSummary(): CatalogSummary {
  seedDb()
  const records = db.professional.getAll() as Professional[]
  const counts = Object.fromEntries(professions.map(profession => [
    profession.slug,
    records.filter(record => record.professionSlug === profession.slug).length
  ]))

  return { total: records.length, professions, counts }
}
