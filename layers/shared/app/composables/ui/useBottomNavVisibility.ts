export function useBottomNavVisibility() {
  const visible = useState('bottom-nav-visible', () => true)

  function show() {
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { visible, show, hide }
}
