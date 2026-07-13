export interface State {
  code: string
  name: string
}

export interface RegionPickerDrawerProps {
  open: boolean
  selectedCode?: string | null
}

export interface RegionPickerDrawerEmits {
  'update:open': [value: boolean]
  'select': [state: State]
  'useLocation': []
}
