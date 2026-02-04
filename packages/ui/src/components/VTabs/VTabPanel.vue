<script setup lang="ts">
import { computed, inject, ref, type WritableComputedRef } from 'vue'

export interface VTabPanelProps {
  /**
   * Panel value (must match corresponding VTab value)
   */
  value: string | number
}

const props = defineProps<VTabPanelProps>()

const activeValue = inject<WritableComputedRef<string | number | undefined>>('activeValue')
const generateTabId = inject<(suffix: string) => string>('generateTabId')
const lazy = inject<boolean>('tabsLazy', false)

const tabId = computed(() => generateTabId?.(`tab-${props.value}`) ?? '')
const panelId = computed(() => generateTabId?.(`panel-${props.value}`) ?? '')
const isActive = computed(() => activeValue?.value === props.value)

// Track if panel has ever been shown (for lazy loading)
const hasBeenActive = ref(false)
if (isActive.value) {
  hasBeenActive.value = true
}

// Watch for activation
const shouldRender = computed(() => {
  if (isActive.value) {
    hasBeenActive.value = true
    return true
  }
  // If lazy, only render if has been active before
  return lazy ? hasBeenActive.value : true
})
</script>

<template>
  <div
    v-if="shouldRender"
    v-show="isActive"
    :id="panelId"
    role="tabpanel"
    :tabindex="0"
    :aria-labelledby="tabId"
    :hidden="!isActive"
    class="py-4 focus:outline-none"
  >
    <slot />
  </div>
</template>
