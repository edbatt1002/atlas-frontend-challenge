import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalsCatalog from '../ProfessionalsCatalog.vue'
import { buildProfessional } from '../../../../mock/fixtures'
import type { Professional } from '../../../types'

const professional = buildProfessional()

let mockState: {
  items: Professional[]
  isPending: boolean
  error: Error | null
  hasNextPage: boolean
  fetchNextPage: () => Promise<unknown>
}

mockNuxtImport('useProfessionals', () => () => ({
  items: ref(mockState.items),
  isPending: ref(mockState.isPending),
  error: ref(mockState.error),
  hasNextPage: ref(mockState.hasNextPage),
  fetchNextPage: mockState.fetchNextPage,
  refetch: vi.fn()
}))

describe('ProfessionalsCatalog', () => {
  it('shows skeletons on the first load', async () => {
    mockState = { items: [], isPending: true, error: null, hasNextPage: false, fetchNextPage: vi.fn() }

    const wrapper = await mountSuspended(ProfessionalsCatalog, { props: { query: {} } })

    expect(wrapper.findAllComponents({ name: 'ProfessionalCardSkeleton' }).length).toBeGreaterThan(0)
  })

  it('renders a card per professional once loaded', async () => {
    mockState = { items: [professional], isPending: false, error: null, hasNextPage: false, fetchNextPage: vi.fn() }

    const wrapper = await mountSuspended(ProfessionalsCatalog, { props: { query: {} } })

    expect(wrapper.text()).toContain('Valentina')
  })

  it('shows the empty state and emits clear when there are no results', async () => {
    mockState = { items: [], isPending: false, error: null, hasNextPage: false, fetchNextPage: vi.fn() }

    const wrapper = await mountSuspended(ProfessionalsCatalog, { props: { query: {} } })
    expect(wrapper.text()).toContain('Nada por aqui')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('shows an error message when the query fails', async () => {
    mockState = { items: [], isPending: false, error: new Error('boom'), hasNextPage: false, fetchNextPage: vi.fn() }

    const wrapper = await mountSuspended(ProfessionalsCatalog, { props: { query: {} } })

    expect(wrapper.text()).toContain('Não foi possível carregar os profissionais.')
  })

  it('shows the end-of-list message once there is no next page', async () => {
    mockState = { items: [professional], isPending: false, error: null, hasNextPage: false, fetchNextPage: vi.fn() }

    const wrapper = await mountSuspended(ProfessionalsCatalog, { props: { query: {} } })

    expect(wrapper.text()).toContain('Você chegou ao fim da lista')
  })
})
