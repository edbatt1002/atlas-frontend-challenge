import { handlers } from '../../mocks/handlers'

export default defineNuxtPlugin(async () => {
  const { setupWorker } = await import('msw/browser')

  const worker = setupWorker(...handlers)
  await worker.start({ onUnhandledRequest: 'bypass' })
})
