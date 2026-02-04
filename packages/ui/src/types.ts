/**
 * vuevuefafa Type Definitions
 */

// Re-export all component types
export type { ButtonVariant, ButtonSize, VButtonProps } from './components/VButton'
export type { InputType, InputSize, VInputProps } from './components/VInput'
export type { CardShadow, VCardProps } from './components/VCard'
export type { ModalSize, VModalProps } from './components/VModal'
export type { DropdownPlacement, VDropdownProps, VDropdownItemProps } from './components/VDropdown'
export type { TooltipPlacement, VTooltipProps } from './components/VTooltip'
export type { VCheckboxProps } from './components/VCheckbox'
export type { VRadioProps, VRadioGroupProps } from './components/VRadio'
export type { TabsOrientation, VTabsProps, VTabProps, VTabPanelProps } from './components/VTabs'
export type { SelectOption, VSelectProps } from './components/VSelect'

// Re-export composable types
export type {
  UseToggleOptions,
  UseToggleReturn,
  UseFocusTrapOptions,
  UseFocusTrapReturn,
  UseThemeOptions,
  UseThemeReturn,
  ThemeMode,
  ThemeConfig,
  UseFetchOptions,
  UseFetchReturn,
  UseIdOptions,
  UseIdReturn,
} from './composables'

// Plugin types
export type { VueVueVafaOptions } from './plugin'
