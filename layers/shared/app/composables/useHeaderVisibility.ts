export function useHeaderVisibility() {
  const visible = useState('header-visible', () => true)

  function show() {
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { visible, show, hide }
}
