import { ref, computed, watch, onMounted, type Ref, type ComputedRef } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeConfig {
  primary?: string
  [key: string]: string | undefined
}

export interface UseThemeOptions {
  /**
   * Initial theme mode
   * @default 'auto'
   */
  initialMode?: ThemeMode
  /**
   * Storage key for persisting theme preference
   * @default 'vvv-theme-mode'
   */
  storageKey?: string
  /**
   * Class to apply for dark mode
   * @default 'vvv-dark'
   */
  darkClass?: string
  /**
   * Class to apply for auto mode
   * @default 'vvv-auto'
   */
  autoClass?: string
  /**
   * Target element to apply theme class
   * @default document.documentElement
   */
  target?: HTMLElement | null
}

export interface UseThemeReturn {
  mode: Ref<ThemeMode>
  isDark: ComputedRef<boolean>
  setMode: (newMode: ThemeMode) => void
  toggleMode: () => void
  applyTheme: (config: ThemeConfig) => void
}

/**
 * Composable for theme management including dark mode
 *
 * @example
 * ```ts
 * const { mode, isDark, toggleMode, applyTheme } = useTheme()
 *
 * // Toggle between light and dark
 * toggleMode()
 *
 * // Apply custom theme colors
 * applyTheme({ primary: '#8b5cf6' })
 * ```
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    initialMode = 'auto',
    storageKey = 'vvv-theme-mode',
    darkClass = 'vvv-dark',
    autoClass = 'vvv-auto',
  } = options

  // Try to read from localStorage
  const getStoredMode = (): ThemeMode => {
    if (typeof window === 'undefined') return initialMode
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return stored
      }
    } catch {
      // localStorage not available
    }
    return initialMode
  }

  const mode = ref<ThemeMode>(getStoredMode())

  const isDark = computed(() => {
    if (mode.value === 'dark') return true
    if (mode.value === 'light') return false
    // Auto mode - check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const getTarget = (): HTMLElement | null => {
    if (options.target) return options.target
    if (typeof document !== 'undefined') return document.documentElement
    return null
  }

  const applyModeClass = (newMode: ThemeMode): void => {
    const target = getTarget()
    if (!target) return

    // Remove existing theme classes
    target.classList.remove(darkClass, autoClass)

    // Apply new class
    if (newMode === 'dark') {
      target.classList.add(darkClass)
    } else if (newMode === 'auto') {
      target.classList.add(autoClass)
    }
    // Light mode: no class needed
  }

  const setMode = (newMode: ThemeMode): void => {
    mode.value = newMode
    try {
      localStorage.setItem(storageKey, newMode)
    } catch {
      // localStorage not available
    }
    applyModeClass(newMode)
  }

  const toggleMode = (): void => {
    const modes: ThemeMode[] = ['light', 'dark', 'auto']
    const currentIndex = modes.indexOf(mode.value)
    const nextIndex = (currentIndex + 1) % modes.length
    setMode(modes[nextIndex])
  }

  const applyTheme = (config: ThemeConfig): void => {
    const target = getTarget()
    if (!target) return

    Object.entries(config).forEach(([key, value]) => {
      if (value) {
        // Convert key like 'primary' to CSS var '--vvv-primary-500'
        // This allows overriding the main color
        target.style.setProperty(`--vvv-${key}-500`, value)
        // Also set related shades (simplified)
        target.style.setProperty(`--vvv-${key}-600`, value)
      }
    })
  }

  // Watch for system preference changes
  onMounted(() => {
    applyModeClass(mode.value)

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (): void => {
        if (mode.value === 'auto') {
          // Force re-computation for auto mode
          // The CSS handles this, but this triggers reactivity
          mode.value = 'auto'
        }
      }
      mediaQuery.addEventListener('change', handleChange)
    }
  })

  watch(mode, (newMode) => {
    applyModeClass(newMode)
  })

  return {
    mode,
    isDark,
    setMode,
    toggleMode,
    applyTheme,
  }
}
