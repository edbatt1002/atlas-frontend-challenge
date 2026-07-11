import { professionalHandlers } from '../../layers/professionals/mock'

export default defineNuxtPlugin(async () => {
  const { setupWorker } = await import('msw/browser')

  const worker = setupWorker(...professionalHandlers)
  await worker.start({ onUnhandledRequest: 'bypass' })
})
