export interface ProfessionalImageSet {
  avatar: string
  cover: string
  gallery: string[]
}

const IMAGE_ROOT = '/images/professionals'

export const professionalImageSets: ProfessionalImageSet[] = Array.from({ length: 16 }, (_, index) => {
  const directory = `${IMAGE_ROOT}/pilot-${String(index + 1).padStart(2, '0')}`

  return {
    avatar: `${directory}/photo-01.webp`,
    cover: `${directory}/cover.webp`,
    gallery: Array.from({ length: 3 }, (_, photoIndex) =>
      `${directory}/photo-${String(photoIndex + 1).padStart(2, '0')}.webp`
    )
  }
})

export function getProfessionalImageSet(index: number): ProfessionalImageSet {
  const distributedIndex = (index * 5) % professionalImageSets.length
  return professionalImageSets[distributedIndex]!
}
