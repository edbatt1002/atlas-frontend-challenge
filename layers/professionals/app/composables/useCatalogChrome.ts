const HEADER_HIDE_THRESHOLD_PX = 80
const DIRECTION_DEAD_ZONE_PX = 10
const SCROLL_THROTTLE_MS = 100

export function shouldShowHeader(scrollY: number, isScrollingUp: boolean, threshold: number = HEADER_HIDE_THRESHOLD_PX): boolean {
  if (scrollY <= threshold) return true
  return isScrollingUp
}

export function getScrollDirectionUp(
  currentY: number,
  lastY: number,
  wasScrollingUp: boolean,
  deadZone: number = DIRECTION_DEAD_ZONE_PX
): boolean {
  const delta = currentY - lastY
  if (Math.abs(delta) < deadZone) return wasScrollingUp
  return delta < 0
}

export function useCatalogChrome() {
  const { show, hide } = useHeaderVisibility()
  const { y } = useScroll(window, { throttle: SCROLL_THROTTLE_MS })

  let lastY = 0
  let isScrollingUp = true

  watch(y, (scrollY) => {
    isScrollingUp = getScrollDirectionUp(scrollY, lastY, isScrollingUp)
    lastY = scrollY
    if (shouldShowHeader(scrollY, isScrollingUp)) show()
    else hide()
  })

  onUnmounted(() => show())
}
