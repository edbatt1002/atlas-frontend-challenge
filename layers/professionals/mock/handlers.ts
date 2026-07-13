import { http, HttpResponse } from 'msw'
import { professions } from './professions'
import { getMockCatalogSummary, getMockProfessional, listMockProfessionals, parseProfessionalListParams } from './repository'

export const handlers = [
  http.get('*/api/catalog-summary', () => HttpResponse.json(getMockCatalogSummary())),

  http.get('*/api/professions', () => HttpResponse.json(professions)),

  http.get('*/api/professionals/:id', ({ params }) => {
    const professional = getMockProfessional(String(params.id))

    if (!professional) {
      return HttpResponse.json({ message: 'Professional not found' }, { status: 404 })
    }

    return HttpResponse.json(professional)
  }),

  http.get('*/api/professionals', ({ request }) => {
    const url = new URL(request.url)
    const params = parseProfessionalListParams(key => url.searchParams.get(key) ?? undefined)

    return HttpResponse.json(listMockProfessionals(params))
  })
]
