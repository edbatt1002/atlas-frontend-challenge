import { http, HttpResponse } from 'msw'
import { db, seedDb } from './db'
import { professions } from './professions'
import type {
  Professional,
  ProfessionalListMeta,
  ProfessionalListResponse,
  ProfessionalSort
} from '../app/types'

type ProfessionalFilterKey = 'search' | 'profession' | 'minPrice' | 'maxPrice' | 'minRating'
type ProfessionalFilters = Partial<Record<ProfessionalFilterKey, string>>

const sortComparators: Record<ProfessionalSort, (a: Professional, b: Professional) => number> = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => b.rating - a.rating,
  distance_asc: (a, b) => a.location.distanceKm - b.location.distanceKm,
  name_asc: (a, b) => a.name.localeCompare(b.name)
}

const filterPredicates: Record<ProfessionalFilterKey, (value: string, p: Professional) => boolean> = {
  search: (value, p) =>
    p.name.toLowerCase().includes(value) || p.profession.toLowerCase().includes(value),
  profession: (value, p) => p.professionSlug === value,
  minPrice: (value, p) => p.price >= Number(value),
  maxPrice: (value, p) => p.price <= Number(value),
  minRating: (value, p) => p.rating >= Number(value)
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
  const comparator = sort ? sortComparators[sort] : null
  return comparator ? [...list].sort(comparator) : list
}

export function paginate(list: Professional[], page: number, limit: number): ProfessionalListResponse {
  const total = list.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * limit
  const meta: ProfessionalListMeta = { page: safePage, limit, total, totalPages }
  return { data: list.slice(start, start + limit), meta }
}

function parseFilters(params: URLSearchParams): ProfessionalFilters {
  return {
    search: params.get('search')?.trim().toLowerCase() || undefined,
    profession: params.get('profession') || undefined,
    minPrice: params.get('minPrice') || undefined,
    maxPrice: params.get('maxPrice') || undefined,
    minRating: params.get('minRating') || undefined
  }
}

export const handlers = [
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
