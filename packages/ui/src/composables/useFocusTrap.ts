import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseFocusTrapOptions {
  /**
   * Whether to activate focus trap immediately
   * @default true
   */
  immediate?: boolean
  /**
   * Element to focus when trap is activated
   * If not provided, focuses the first focusable element
   */
  initialFocus?: HTMLElement | null
  /**
   * Element to focus when trap is deactivated
   * If not provided, focuses the element that was focused before activation
   */
  returnFocus?: HTMLElement | null
  /**
   * Allow escape key to deactivate trap
   * @default true
   */
  escapeDeactivates?: boolean
  /**
   * Callback when escape is pressed
   */
  onEscape?: () => void
}

export interface UseFocusTrapReturn {
  activate: () => void
  deactivate: () => void
  isActive: Ref<boolean>
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Composable for trapping focus within a container element
 * Essential for accessible modal dialogs and popups
 *
 * @example
 * ```ts
 * const containerRef = ref<HTMLElement | null>(null)
 * const { activate, deactivate, isActive } = useFocusTrap(containerRef)
 *
 * // Activate when modal opens
 * activate()
 *
 * // Deactivate when modal closes
 * deactivate()
 * ```
 */
export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  options: UseFocusTrapOptions = {}
): UseFocusTrapReturn {
  const {
    immediate = false,
    initialFocus = null,
    returnFocus = null,
    escapeDeactivates = true,
    onEscape,
  } = options

  const isActive = ref(false)
  let previouslyFocused: HTMLElement | null = null

  const getFocusableElements = (): HTMLElement[] => {
    if (!container.value) return []
    return Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    )
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!isActive.value || !container.value) return

    if (event.key === 'Escape' && escapeDeactivates) {
      event.preventDefault()
      event.stopPropagation()
      onEscape?.()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab: go backwards
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab: go forwards
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  const activate = (): void => {
    if (isActive.value || !container.value) return

    previouslyFocused = document.activeElement as HTMLElement

    isActive.value = true
    document.addEventListener('keydown', handleKeyDown)

    // Focus initial element
    const elementToFocus = initialFocus || getFocusableElements()[0]
    if (elementToFocus) {
      // Use setTimeout to ensure element is in the DOM
      setTimeout(() => {
        elementToFocus.focus()
      }, 0)
    }
  }

  const deactivate = (): void => {
    if (!isActive.value) return

    isActive.value = false
    document.removeEventListener('keydown', handleKeyDown)

    // Return focus
    const elementToFocus = returnFocus || previouslyFocused
    if (elementToFocus && typeof elementToFocus.focus === 'function') {
      elementToFocus.focus()
    }

    previouslyFocused = null
  }

  onMounted(() => {
    if (immediate && container.value) {
      activate()
    }
  })

  onUnmounted(() => {
    deactivate()
  })

  return {
    activate,
    deactivate,
    isActive,
  }
}
