export default defineNuxtPlugin(() => {
  if (import.meta.test) return

  onNuxtReady(async () => {
    const [{ setupWorker }, { handlers }] = await Promise.all([
      import('msw/browser'),
      import('../../mocks/handlers')
    ])

    const worker = setupWorker(...handlers)
    await worker.start({ onUnhandledRequest: 'bypass' })
  })
})
