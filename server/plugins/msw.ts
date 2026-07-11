import { handlers } from '../../mocks/handlers'

export default defineNitroPlugin(async () => {
  const { setupServer } = await import('msw/node')

  const server = setupServer(...handlers)
  server.listen({ onUnhandledRequest: 'bypass' })
})
