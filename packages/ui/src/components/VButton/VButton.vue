<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface VButtonProps {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean
  /**
   * HTML button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Make button full width
   * @default false
   */
  block?: boolean
}

const props = withDefaults(defineProps<VButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const hasLeftIcon = computed(() => !!slots['icon-left'])
const hasRightIcon = computed(() => !!slots['icon-right'])
const hasDefaultSlot = computed(() => !!slots.default)

const isDisabled = computed(() => props.disabled || props.loading)

const variantClasses = computed(() => {
  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-primary-600 text-white
      hover:bg-primary-700
      active:bg-primary-800
      focus-visible:ring-primary-500
      disabled:bg-primary-300
    `,
    secondary: `
      bg-neutral-100 text-neutral-900
      hover:bg-neutral-200
      active:bg-neutral-300
      focus-visible:ring-neutral-500
      disabled:bg-neutral-50 disabled:text-neutral-400
    `,
    outline: `
      bg-transparent text-neutral-700 border border-neutral-300
      hover:bg-neutral-50 hover:border-neutral-400
      active:bg-neutral-100
      focus-visible:ring-primary-500
      disabled:text-neutral-400 disabled:border-neutral-200
    `,
    ghost: `
      bg-transparent text-neutral-700
      hover:bg-neutral-100
      active:bg-neutral-200
      focus-visible:ring-primary-500
      disabled:text-neutral-400
    `,
    danger: `
      bg-danger-600 text-white
      hover:bg-danger-700
      active:bg-danger-800
      focus-visible:ring-danger-500
      disabled:bg-danger-300
    `,
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2.5',
  }
  return sizes[props.size]
})

const iconSizeClasses = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  return sizes[props.size]
})

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-busy="loading"
    :class="[
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-colors duration-fast',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      // Dynamic styles
      variantClasses,
      sizeClasses,
      { 'w-full': block },
    ]"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading" :class="['animate-spin', iconSizeClasses]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-full h-full">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>

    <!-- Left icon slot -->
    <span v-else-if="hasLeftIcon" :class="iconSizeClasses" aria-hidden="true">
      <slot name="icon-left" />
    </span>

    <!-- Default content slot -->
    <span v-if="hasDefaultSlot" :class="{ 'sr-only': loading && !hasDefaultSlot }">
      <slot />
    </span>

    <!-- Right icon slot -->
    <span v-if="hasRightIcon && !loading" :class="iconSizeClasses" aria-hidden="true">
      <slot name="icon-right" />
    </span>
  </button>
</template>
