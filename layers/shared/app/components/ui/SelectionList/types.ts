export interface SelectionListItem {
  label: string
  value: string
}

export interface SelectionListProps {
  items: SelectionListItem[]
  modelValue?: string
}

export interface SelectionListEmits {
  'update:modelValue': [value: string]
}
