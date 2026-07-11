import { mountSuspended } from '@nuxt/test-utils/runtime'
import CatalogToolbar from '../CatalogToolbar.vue'

describe('CatalogToolbar', () => {
  it('renders the search input bound to the model', async () => {
    const wrapper = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'search': 'ana', 'onUpdate:search': () => {} }
    })

    expect(wrapper.find('input').element.value).toBe('ana')
  })

  it('shows the filter badge only when there are active filters', async () => {
    const withFilters = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 2, 'search': '', 'onUpdate:search': () => {} }
    })
    expect(withFilters.text()).toContain('2')

    const withoutFilters = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'search': '', 'onUpdate:search': () => {} }
    })
    expect(withoutFilters.text()).not.toMatch(/\d/)
  })

  it('emits open with the right mode for each button', async () => {
    const wrapper = await mountSuspended(CatalogToolbar, {
      props: { 'filterCount': 0, 'search': '', 'onUpdate:search': () => {} }
    })
    const buttons = wrapper.findAll('button')

    await buttons[0]!.trigger('click')
    await buttons[1]!.trigger('click')
    await buttons[2]!.trigger('click')

    expect(wrapper.emitted('open')).toEqual([['filter'], ['geo'], ['sort']])
  })
})
