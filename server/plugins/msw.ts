import { professionalHandlers } from '../../layers/professionals/mock'

export default defineNitroPlugin(async () => {
  const { setupServer } = await import('msw/node')

  const server = setupServer(...professionalHandlers)
  server.listen({ onUnhandledRequest: 'bypass' })
})
