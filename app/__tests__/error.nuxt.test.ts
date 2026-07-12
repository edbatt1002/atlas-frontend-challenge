import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import type { NuxtError } from '#app'
import ErrorPage from '../error.vue'

const { clearError } = vi.hoisted(() => ({ clearError: vi.fn() }))

mockNuxtImport('clearError', () => clearError)

function buildError(statusCode: number): NuxtError {
  return { statusCode, statusMessage: '', message: '', name: 'NuxtError', fatal: false, unhandled: false, toJSON: () => ({}) } as unknown as NuxtError
}

describe('error.vue', () => {
  beforeEach(() => clearError.mockClear())

  it('shows a not-found message with a link back home for a 404', async () => {
    const wrapper = await mountSuspended(ErrorPage, { props: { error: buildError(404) } })

    expect(wrapper.text()).toContain('Página não encontrada')
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Tentar novamente')
  })

  it('shows a generic error message with a retry action for other status codes', async () => {
    const wrapper = await mountSuspended(ErrorPage, { props: { error: buildError(500) } })

    expect(wrapper.text()).toContain('Algo deu errado')
    expect(wrapper.text()).toContain('Tentar novamente')
  })

  it('clears the error and redirects home when retrying', async () => {
    const wrapper = await mountSuspended(ErrorPage, { props: { error: buildError(500) } })

    await wrapper.findAll('button').find(b => b.text() === 'Tentar novamente')!.trigger('click')

    expect(clearError).toHaveBeenCalledWith({ redirect: '/' })
  })

  it('always links to /suporte to report a problem', async () => {
    const wrapper = await mountSuspended(ErrorPage, { props: { error: buildError(404) } })

    expect(wrapper.find('a[href="/suporte"]').exists()).toBe(true)
  })
})
