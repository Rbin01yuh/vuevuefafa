import { ref, type Ref } from 'vue'

export interface UseToggleOptions {
  initialValue?: boolean
  onToggle?: (value: boolean) => void
}

export interface UseToggleReturn {
  value: Ref<boolean>
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  set: (newValue: boolean) => void
}

/**
 * Composable for managing boolean toggle state
 *
 * @example
 * ```ts
 * const { value, toggle, setTrue, setFalse } = useToggle()
 *
 * // In template
 * <button @click="toggle">{{ value ? 'On' : 'Off' }}</button>
 * ```
 */
export function useToggle(options: UseToggleOptions = {}): UseToggleReturn {
  const { initialValue = false, onToggle } = options

  const value = ref(initialValue)

  const toggle = (): void => {
    value.value = !value.value
    onToggle?.(value.value)
  }

  const setTrue = (): void => {
    if (!value.value) {
      value.value = true
      onToggle?.(true)
    }
  }

  const setFalse = (): void => {
    if (value.value) {
      value.value = false
      onToggle?.(false)
    }
  }

  const set = (newValue: boolean): void => {
    if (value.value !== newValue) {
      value.value = newValue
      onToggle?.(newValue)
    }
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    set,
  }
}
