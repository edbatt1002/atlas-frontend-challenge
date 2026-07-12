export interface CategoryItem {
  slug: string
  label: string
  icon: string
  count: number | null
}

export interface CategoriesProps {
  categories: CategoryItem[]
}
