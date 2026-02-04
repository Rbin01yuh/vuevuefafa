<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue'
import { useId } from '../../composables/useId'

export type TabsOrientation = 'horizontal' | 'vertical'

export interface VTabsProps {
  /**
   * Active tab value (v-model)
   */
  modelValue?: string | number
  /**
   * Default active tab (uncontrolled)
   */
  defaultValue?: string | number
  /**
   * Tabs orientation
   * @default 'horizontal'
   */
  orientation?: TabsOrientation
  /**
   * Whether to lazy load tab content
   * @default false
   */
  lazy?: boolean
}

const props = withDefaults(defineProps<VTabsProps>(), {
  orientation: 'horizontal',
  lazy: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const { id: tabsId, generateId } = useId({ prefix: 'tabs' })

// Track registered tabs
const registeredTabs = ref<Array<{ value: string | number; label: string; disabled?: boolean }>>([])

// Internal active value
const internalValue = ref<string | number | undefined>(props.defaultValue)

const activeValue = computed({
  get: () => props.modelValue ?? internalValue.value,
  set: (value) => {
    internalValue.value = value
    emit('update:modelValue', value!)
    emit('change', value!)
  },
})

// Register tab
const registerTab = (tab: { value: string | number; label: string; disabled?: boolean }) => {
  if (!registeredTabs.value.find((t) => t.value === tab.value)) {
    registeredTabs.value.push(tab)
    // Set first tab as active if none specified
    if (!activeValue.value && !tab.disabled) {
      activeValue.value = tab.value
    }
  }
}

// Unregister tab
const unregisterTab = (value: string | number) => {
  registeredTabs.value = registeredTabs.value.filter((t) => t.value !== value)
}

// Provide context to child components
provide('tabsId', tabsId.value)
provide('generateTabId', generateId)
provide('activeValue', activeValue)
provide('registerTab', registerTab)
provide('unregisterTab', unregisterTab)
provide('tabsLazy', props.lazy)

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  const tabs = registeredTabs.value.filter((t) => !t.disabled)
  const currentIndex = tabs.findIndex((t) => t.value === activeValue.value)

  let nextIndex = currentIndex

  if (props.orientation === 'horizontal') {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
    }
  } else {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
    }
  }

  if (event.key === 'Home') {
    event.preventDefault()
    nextIndex = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    nextIndex = tabs.length - 1
  }

  if (nextIndex !== currentIndex && tabs[nextIndex]) {
    activeValue.value = tabs[nextIndex].value
    // Focus the tab button
    const tabButton = document.getElementById(generateId(`tab-${tabs[nextIndex].value}`))
    tabButton?.focus()
  }
}

provide('handleKeydown', handleKeydown)
</script>

<template>
  <div :id="tabsId" :class="['vvv-tabs', orientation === 'vertical' ? 'flex gap-4' : '']">
    <slot />
  </div>
</template>
