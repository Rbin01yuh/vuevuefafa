/**
 * vuevuefafa - Production-ready Vue 3 UI Kit
 *
 * @packageDocumentation
 */

// Plugin
export { VueVueVafa, default } from './plugin'
export type { VueVueVafaOptions } from './plugin'

// Components
export {
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
} from './components'

// Composables
export {
  useToggle,
  useFocusTrap,
  useTheme,
  useFetch,
  useId,
  generateUniqueId,
} from './composables'

// Types
export * from './types'

// Styles (side effect import for when using individual components)
import './styles/index.css'
