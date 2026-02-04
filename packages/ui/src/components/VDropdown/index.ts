export { default as VDropdown } from './VDropdown.vue'
export { default as VDropdownItem } from './VDropdownItem.vue'

// Type definitions
export type DropdownPlacement =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'

export interface VDropdownProps {
  modelValue?: boolean
  placement?: DropdownPlacement
  disabled?: boolean
  closeOnClickOutside?: boolean
  closeOnSelect?: boolean
  width?: 'auto' | 'trigger' | string
}

export interface VDropdownItemProps {
  disabled?: boolean
  destructive?: boolean
}
