import type { App, Plugin } from 'vue'
import type { ThemeConfig } from './composables/useTheme'

// Import all components
import { VButton } from './components/VButton'
import { VInput } from './components/VInput'
import { VCard } from './components/VCard'
import { VModal } from './components/VModal'
import { VDropdown, VDropdownItem } from './components/VDropdown'
import { VTooltip } from './components/VTooltip'
import { VCheckbox } from './components/VCheckbox'
import { VRadio, VRadioGroup } from './components/VRadio'
import { VTabs, VTabList, VTab, VTabPanels, VTabPanel } from './components/VTabs'
import { VSelect } from './components/VSelect'

// Import styles
import './styles/index.css'

export interface VueVueVafaOptions {
  /**
   * Component name prefix
   * @default 'V'
   */
  prefix?: string
  /**
   * Custom theme configuration
   */
  theme?: ThemeConfig
  /**
   * Enable dark mode by default
   * @default false
   */
  darkMode?: boolean
}

const components = {
  VButton,
  VInput,
  VCard,
  VModal,
  VDropdown,
  VDropdownItem,
  VTooltip,
  VCheckbox,
  VRadio,
  VRadioGroup,
  VTabs,
  VTabList,
  VTab,
  VTabPanels,
  VTabPanel,
  VSelect,
} as const

/**
 * Apply theme configuration to CSS custom properties
 */
function applyTheme(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  
  Object.entries(theme).forEach(([key, value]) => {
    if (value) {
      // Set the main color
      root.style.setProperty(`--vvv-${key}-500`, value)
      // Could generate shades here if needed
    }
  })
}

/**
 * Vue plugin for vuevuefafa
 */
export const VueVueVafa: Plugin = {
  install(app: App, options: VueVueVafaOptions = {}) {
    const { prefix = 'V', theme, darkMode = false } = options

    // Register all components
    Object.entries(components).forEach(([name, component]) => {
      // Replace default 'V' prefix with custom prefix if provided
      const componentName = prefix === 'V' ? name : name.replace(/^V/, prefix)
      app.component(componentName, component)
    })

    // Apply custom theme
    if (theme) {
      applyTheme(theme)
    }

    // Apply dark mode
    if (darkMode && typeof document !== 'undefined') {
      document.documentElement.classList.add('vvv-dark')
    }

    // Provide global configuration
    app.provide('vuevuefafa-options', options)
  },
}

export default VueVueVafa
