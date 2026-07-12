import { defineComponent, h, nextTick, ref } from 'vue'
import { DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UApp from '@nuxt/ui/components/App.vue'
import GalleryLightbox from '../GalleryLightbox.vue'
import type { GalleryLightboxProps } from '../types'
import type { ProfessionalMedia } from '../../../../types'

const media: ProfessionalMedia[] = [
  { url: 'https://example.test/1.jpg', type: 'photo' },
  { url: 'https://example.test/2.jpg', type: 'video' },
  { url: 'https://example.test/3.jpg', type: 'photo' }
]

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | null = null

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = null
})

async function mountLightbox(props: GalleryLightboxProps) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(GalleryLightbox, props)
      })
    }
  })
  activeWrapper = await mountSuspended(Host, { attachTo: document.body })
  return {
    lightbox: activeWrapper.findComponent(GalleryLightbox),
    body: new DOMWrapper(document.body)
  }
}

describe('ProfessionalProfileGalleryLightbox', () => {
  it('renders nothing when closed', async () => {
    const { body } = await mountLightbox({ open: false, media, name: 'Valentina' })

    expect(body.text()).not.toContain('mídias')
  })

  it('shows the grid with a thumbnail per media item when open', async () => {
    const { body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    expect(body.findAll('img')).toHaveLength(3)
    expect(body.text()).toContain('3 mídias')
  })

  it('marks video thumbnails with a play indicator', async () => {
    const { body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    expect(body.text()).toContain('▶')
  })

  it('filters the grid by media type', async () => {
    const { body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    const photosFilter = body.findAll('button').find(b => b.text() === 'Fotos')
    await photosFilter!.trigger('click')

    expect(body.findAll('img')).toHaveLength(2)
  })

  it('switches to feed view showing the clicked item', async () => {
    const { body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    await body.find('img[alt*="mídia 2"]').trigger('click')

    expect(body.text()).toContain('2/3')
  })

  it('toggles between grid and feed with the view buttons', async () => {
    const { body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    await body.find('[aria-label="Feed"]').trigger('click')
    expect(body.text()).toContain('1/3')

    await body.find('[aria-label="Grade"]').trigger('click')
    expect(body.findAll('img')).toHaveLength(3)
  })

  it('resets to the grid with no filter when re-opened', async () => {
    const open = ref(true)
    const Host = defineComponent({
      setup() {
        return () => h(UApp, null, {
          default: () => h(GalleryLightbox, { open: open.value, media, name: 'Valentina' })
        })
      }
    })
    activeWrapper = await mountSuspended(Host, { attachTo: document.body })
    const body = new DOMWrapper(document.body)

    await body.findAll('button').find(b => b.text() === 'Fotos')!.trigger('click')
    await body.find('[aria-label="Feed"]').trigger('click')

    open.value = false
    await nextTick()
    open.value = true
    await nextTick()

    expect(body.findAll('img')).toHaveLength(3)
  })

  it('emits close when the close button is clicked', async () => {
    const { lightbox, body } = await mountLightbox({ open: true, media, name: 'Valentina' })

    await body.find('[aria-label="Fechar"]').trigger('click')

    expect(lightbox.emitted('close')).toHaveLength(1)
  })
})
