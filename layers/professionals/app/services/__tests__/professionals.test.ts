import { http, HttpResponse } from 'msw'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setupMockApi } from '~~/mocks/testServer'

mockNuxtImport('useRuntimeConfig', () => () => ({ public: { apiBase: 'http://localhost' } }))
const server = setupMockApi()

describe('getCatalogSummary', () => {
  it('returns total and profession counts in one request', async () => {
    const { getCatalogSummary } = await import('../professionals')

    const summary = await getCatalogSummary()

    expect(summary.total).toBeGreaterThanOrEqual(500)
    expect(summary.professions.length).toBeGreaterThan(0)
    expect(summary.counts[summary.professions[0]!.slug]).toBeGreaterThan(0)
  })
})

describe('listProfessionals', () => {
  it('returns a page of professionals with meta', async () => {
    const { listProfessionals } = await import('../professionals')

    const result = await listProfessionals({ limit: 5 })

    expect(result.data).toHaveLength(5)
    expect(result.meta.total).toBeGreaterThan(0)
    expect(result.data[0]!.gallery.length).toBeLessThanOrEqual(4)
    expect(result.data[0]).not.toHaveProperty('reviews')
    expect(result.data[0]).not.toHaveProperty('availability')
  })

  it('forwards filter params to the handler', async () => {
    const { listProfessionals } = await import('../professionals')

    const result = await listProfessionals({ profession: 'modelo' })

    expect(result.data.length).toBeGreaterThan(0)
    expect(result.data.every(p => p.professionSlug === 'modelo')).toBe(true)
  })

  it('forwards the state filter to the handler', async () => {
    const { listProfessionals } = await import('../professionals')
    const state = (await listProfessionals({ limit: 1 })).data[0]!.location.state

    const result = await listProfessionals({ state })

    expect(result.data.length).toBeGreaterThan(0)
    expect(result.data.every(p => p.location.state === state)).toBe(true)
  })

  it('throws when the server responds with an error', async () => {
    server.use(
      http.get('*/api/professionals', () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }))
    )
    const { listProfessionals } = await import('../professionals')

    await expect(listProfessionals()).rejects.toMatchObject({ statusCode: 500 })
  })
})

describe('getProfessional', () => {
  it('fetches a single professional by id', async () => {
    const { listProfessionals, getProfessional } = await import('../professionals')
    const id = (await listProfessionals({ limit: 1 })).data[0]!.id

    const result = await getProfessional(id)

    expect(result.id).toBe(id)
  })

  it('throws a 404 for an unknown id', async () => {
    const { getProfessional } = await import('../professionals')

    await expect(getProfessional('does-not-exist')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('listProfessions', () => {
  it('returns the category list', async () => {
    const { listProfessions } = await import('../professionals')

    const result = await listProfessions()

    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('slug')
  })
})
