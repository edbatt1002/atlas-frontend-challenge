import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { $fetch as ofetch } from 'ofetch'
import { handlers } from './handlers'

export function setupMockApi() {
  vi.stubGlobal('$fetch', ofetch)

  const server = setupServer(...handlers)
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  return server
}
