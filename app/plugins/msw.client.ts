import { handlers } from '../../mocks/handlers'

export default defineNuxtPlugin(async () => {
  if (import.meta.test) return

  const { setupWorker } = await import('msw/browser')

  const worker = setupWorker(...handlers)
  await worker.start({ onUnhandledRequest: 'bypass' })
})
