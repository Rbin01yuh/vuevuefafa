<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface VCardProps {
  /**
   * Shadow size
   * @default 'md'
   */
  shadow?: CardShadow
  /**
   * Whether to show border
   * @default true
   */
  bordered?: boolean
  /**
   * Whether card is hoverable (adds hover effect)
   * @default false
   */
  hoverable?: boolean
  /**
   * Whether card content has padding
   * @default true
   */
  padded?: boolean
}

const props = withDefaults(defineProps<VCardProps>(), {
  shadow: 'md',
  bordered: true,
  hoverable: false,
  padded: true,
})

const slots = useSlots()

const hasHeader = computed(() => !!slots.header)
const hasFooter = computed(() => !!slots.footer)

const shadowClasses = computed(() => {
  const shadows: Record<CardShadow, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }
  return shadows[props.shadow]
})

const cardClasses = computed(() => [
  // Base
  'bg-white rounded-xl overflow-hidden',
  'transition-shadow duration-fast',
  // Shadow
  shadowClasses.value,
  // Border
  { 'border border-neutral-200': props.bordered },
  // Hoverable
  { 'hover:shadow-lg cursor-pointer': props.hoverable },
])
</script>

<template>
  <div :class="cardClasses">
    <!-- Header slot -->
    <div v-if="hasHeader" class="px-6 py-4 border-b border-neutral-200">
      <slot name="header" />
    </div>

    <!-- Default content slot -->
    <div :class="[padded ? 'p-6' : '']">
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="hasFooter" class="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
      <slot name="footer" />
    </div>
  </div>
</template>
