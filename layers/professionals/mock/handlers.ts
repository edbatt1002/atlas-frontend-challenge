import { http, HttpResponse } from 'msw'
import { db, seedDb } from './db'
import { professions } from './professions'
import { getMockCatalogSummary } from './repository'
import type {
  Professional,
  ProfessionalListMeta,
  ProfessionalListResponse,
  ProfessionalSummary,
  ProfessionalSort
} from '../app/types'

type ProfessionalFilterKey = 'search' | 'profession' | 'state' | 'online' | 'min_price' | 'max_price' | 'min_rating'
type ProfessionalFilters = Partial<Record<ProfessionalFilterKey, string>>

const sortComparators: Record<ProfessionalSort, (a: Professional, b: Professional) => number> = {
  featured: (a, b) => Number(b.online) - Number(a.online) || b.rating - a.rating,
  newest: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  nearest: (a, b) => a.location.distanceKm - b.location.distanceKm,
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.price - b.price
}

const filterPredicates: Record<ProfessionalFilterKey, (value: string, p: Professional) => boolean> = {
  search: (value, p) =>
    p.name.toLowerCase().includes(value) || p.profession.toLowerCase().includes(value),
  profession: (value, p) => p.professionSlug === value,
  state: (value, p) => p.location.state === value,
  online: (value, p) => p.online === (value === 'true'),
  min_price: (value, p) => p.price >= Number(value),
  max_price: (value, p) => p.price <= Number(value),
  min_rating: (value, p) => p.rating >= Number(value)
}

export function filterProfessionals(list: Professional[], filters: ProfessionalFilters) {
  return (Object.entries(filters) as [ProfessionalFilterKey, string | undefined][]).reduce(
    (results, [key, value]) => {
      if (!value) return results
      return results.filter(p => filterPredicates[key](value, p))
    },
    list
  )
}

export function sortProfessionals(list: Professional[], sort: ProfessionalSort | null) {
  const comparator = sortComparators[sort ?? 'featured']
  return [...list].sort(comparator)
}

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

export function paginate(list: Professional[], page: number, limit: number): ProfessionalListResponse {
  const total = list.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * limit
  const meta: ProfessionalListMeta = { page: safePage, limit, total, totalPages }
  return { data: list.slice(start, start + limit).map(toProfessionalSummary), meta }
}

function parseFilters(params: URLSearchParams): ProfessionalFilters {
  return {
    search: params.get('search')?.trim().toLowerCase() || undefined,
    profession: params.get('profession') || undefined,
    state: params.get('state') || undefined,
    online: params.get('online') || undefined,
    min_price: params.get('min_price') || undefined,
    max_price: params.get('max_price') || undefined,
    min_rating: params.get('min_rating') || undefined
  }
}

export const handlers = [
  http.get('*/api/catalog-summary', () => HttpResponse.json(getMockCatalogSummary())),

  http.get('*/api/professions', () => {
    seedDb()
    return HttpResponse.json(professions)
  }),

  http.get('*/api/professionals/:id', ({ params }) => {
    seedDb()
    const record = db.professional.findFirst({
      where: { id: { equals: String(params.id) } }
    })

    if (!record) {
      return HttpResponse.json({ message: 'Professional not found' }, { status: 404 })
    }

    return HttpResponse.json(record)
  }),

  http.get('*/api/professionals', ({ request }) => {
    seedDb()
    const url = new URL(request.url)
    const sort = url.searchParams.get('sort') as ProfessionalSort | null
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? 24))

    const all = db.professional.getAll() as Professional[]
    const filtered = filterProfessionals(all, parseFilters(url.searchParams))
    const results = sortProfessionals(filtered, sort)

    return HttpResponse.json(paginate(results, page, limit))
  })
]
