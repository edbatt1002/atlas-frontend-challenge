import { fakerPT_BR as faker } from '@faker-js/faker'

export interface ProfessionalImageSet {
  avatar: string
  cover: string
  gallery: string[]
}

const IMAGE_ROOT = '/images/professionals'

export const professionalImageSets: ProfessionalImageSet[] = Array.from({ length: 24 }, (_, index) => {
  const directory = `${IMAGE_ROOT}/pilot-${String(index + 1).padStart(2, '0')}`

  return {
    avatar: `${directory}/photo-01.webp`,
    cover: `${directory}/cover.webp`,
    gallery: Array.from({ length: 3 }, (_, photoIndex) =>
      `${directory}/photo-${String(photoIndex + 1).padStart(2, '0')}.webp`
    )
  }
})

function getLocalImageSet(index: number): ProfessionalImageSet {
  const distributedIndex = (index * 7) % professionalImageSets.length
  return professionalImageSets[distributedIndex]!
}

function buildFakerImageSet(): ProfessionalImageSet {
  const photo = (width: number, height: number) => faker.image.urlPicsumPhotos({ width, height, blur: 0, grayscale: false })

  return {
    avatar: photo(200, 200),
    cover: photo(1280, 480),
    gallery: Array.from({ length: 3 }, () => photo(640, 800))
  }
}

export function getProfessionalImageSet(index: number, source: string = 'local'): ProfessionalImageSet {
  if (source === 'faker') return buildFakerImageSet()
  return getLocalImageSet(index)
}
