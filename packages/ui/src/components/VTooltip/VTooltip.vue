<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useId } from '../../composables/useId'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface VTooltipProps {
  /**
   * Tooltip content text
   */
  content: string
  /**
   * Tooltip placement
   * @default 'top'
   */
  placement?: TooltipPlacement
  /**
   * Delay before showing (ms)
   * @default 200
   */
  delay?: number
  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Show arrow
   * @default true
   */
  arrow?: boolean
}

const props = withDefaults(defineProps<VTooltipProps>(), {
  placement: 'top',
  delay: 200,
  disabled: false,
  arrow: true,
})

const triggerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const { id: tooltipId } = useId({ prefix: 'tooltip' })

const placementClasses = computed(() => {
  const placements: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }
  return placements[props.placement]
})

const arrowClasses = computed(() => {
  const arrows: Record<TooltipPlacement, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-800',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-800',
    right:
      'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-800',
  }
  return arrows[props.placement]
})

const show = () => {
  if (props.disabled) return

  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }

  showTimeout = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

const hide = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }

  hideTimeout = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

const handleFocus = () => show()
const handleBlur = () => hide()

onUnmounted(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>

<template>
  <div
    class="relative inline-block"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="handleFocus"
    @focusout="handleBlur"
  >
    <!-- Trigger -->
    <div ref="triggerRef" :aria-describedby="isVisible ? tooltipId : undefined">
      <slot />
    </div>

    <!-- Tooltip -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible && content"
        :id="tooltipId"
        role="tooltip"
        :class="[
          'absolute z-tooltip',
          'px-2 py-1 text-sm text-white bg-neutral-800 rounded',
          'whitespace-nowrap pointer-events-none',
          placementClasses,
        ]"
      >
        {{ content }}

        <!-- Arrow -->
        <span
          v-if="arrow"
          :class="['absolute w-0 h-0 border-4', arrowClasses]"
          aria-hidden="true"
        />
      </div>
    </Transition>
  </div>
</template>
