import { markRaw } from 'vue'

if (typeof window !== 'undefined') {
  const originalGetComputedStyle = window.getComputedStyle.bind(window)
  window.getComputedStyle = ((element: Element, pseudoElement?: string | null) =>
    markRaw(originalGetComputedStyle(element, pseudoElement ?? undefined))) as typeof window.getComputedStyle
}
