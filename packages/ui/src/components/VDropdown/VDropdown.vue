<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useId } from '../../composables/useId'

export type DropdownPlacement =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'

export interface VDropdownProps {
  /**
   * Whether dropdown is open (v-model)
   */
  modelValue?: boolean
  /**
   * Dropdown placement
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement
  /**
   * Disable dropdown
   * @default false
   */
  disabled?: boolean
  /**
   * Close on outside click
   * @default true
   */
  closeOnClickOutside?: boolean
  /**
   * Close when item is selected
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * Width of dropdown menu
   * @default 'auto'
   */
  width?: 'auto' | 'trigger' | string
}

const props = withDefaults(defineProps<VDropdownProps>(), {
  modelValue: false,
  placement: 'bottom-start',
  disabled: false,
  closeOnClickOutside: true,
  closeOnSelect: true,
  width: 'auto',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const focusedIndex = ref(-1)
const isOpen = ref(props.modelValue)

const { id: dropdownId, generateId } = useId({ prefix: 'dropdown' })
const menuId = generateId('menu')

const placementClasses = computed(() => {
  const placements: Record<DropdownPlacement, string> = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
  }
  return placements[props.placement]
})

const menuStyle = computed(() => {
  if (props.width === 'auto') return {}
  if (props.width === 'trigger') return { width: triggerRef.value?.offsetWidth + 'px' }
  return { width: props.width }
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value ? close() : open()
}

const open = () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  focusedIndex.value = -1
  emit('update:modelValue', true)
  emit('open')
  nextTick(() => {
    menuRef.value?.focus()
  })
}

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  focusedIndex.value = -1
  emit('update:modelValue', false)
  emit('close')
}

const getMenuItems = (): HTMLElement[] => {
  if (!menuRef.value) return []
  return Array.from(
    menuRef.value.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])')
  )
}

const focusItem = (index: number) => {
  const items = getMenuItems()
  if (items.length === 0) return

  if (index < 0) index = items.length - 1
  if (index >= items.length) index = 0

  focusedIndex.value = index
  items[index]?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      open()
    }
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusItem(focusedIndex.value + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusItem(focusedIndex.value - 1)
      break
    case 'Home':
      event.preventDefault()
      focusItem(0)
      break
    case 'End':
      event.preventDefault()
      focusItem(getMenuItems().length - 1)
      break
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.focus()
      break
    case 'Tab':
      close()
      break
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside || !isOpen.value) return

  const target = event.target as Node
  if (triggerRef.value?.contains(target) || menuRef.value?.contains(target)) {
    return
  }
  close()
}

const handleItemClick = () => {
  if (props.closeOnSelect) {
    close()
    triggerRef.value?.focus()
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue
  }
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ open, close, toggle })
</script>

<template>
  <div :id="dropdownId" class="relative inline-block" @keydown="handleKeydown">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      role="button"
      tabindex="0"
      :aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      :aria-disabled="disabled"
      :class="{ 'cursor-not-allowed opacity-50': disabled }"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="trigger" :is-open="isOpen" />
    </div>

    <!-- Menu -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :id="menuId"
        ref="menuRef"
        role="menu"
        tabindex="-1"
        :aria-labelledby="dropdownId"
        :class="[
          'absolute z-dropdown min-w-[8rem]',
          'bg-white rounded-lg shadow-lg border border-neutral-200',
          'py-1 focus:outline-none',
          'origin-top',
          placementClasses,
        ]"
        :style="menuStyle"
        @click="handleItemClick"
      >
        <slot :close="close" />
      </div>
    </Transition>
  </div>
</template>
