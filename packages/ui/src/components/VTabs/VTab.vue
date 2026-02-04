<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, type WritableComputedRef } from 'vue'

export interface VTabProps {
  /**
   * Tab value identifier
   */
  value: string | number
  /**
   * Whether tab is disabled
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<VTabProps>(), {
  disabled: false,
})

const activeValue = inject<WritableComputedRef<string | number | undefined>>('activeValue')
const generateTabId = inject<(suffix: string) => string>('generateTabId')
const registerTab =
  inject<(tab: { value: string | number; label: string; disabled?: boolean }) => void>(
    'registerTab'
  )
const unregisterTab = inject<(value: string | number) => void>('unregisterTab')

const tabId = computed(() => generateTabId?.(`tab-${props.value}`) ?? '')
const panelId = computed(() => generateTabId?.(`panel-${props.value}`) ?? '')
const isActive = computed(() => activeValue?.value === props.value)

const handleClick = () => {
  if (!props.disabled && activeValue) {
    activeValue.value = props.value
  }
}

onMounted(() => {
  registerTab?.({ value: props.value, label: '', disabled: props.disabled })
})

onUnmounted(() => {
  unregisterTab?.(props.value)
})
</script>

<template>
  <button
    :id="tabId"
    type="button"
    role="tab"
    :tabindex="isActive ? 0 : -1"
    :aria-selected="isActive"
    :aria-controls="panelId"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="[
      'px-4 py-2.5 -mb-px text-sm font-medium',
      'border-b-2 transition-colors duration-fast',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
      isActive
        ? 'text-primary-600 border-primary-600'
        : 'text-neutral-600 border-transparent hover:text-neutral-900 hover:border-neutral-300',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
