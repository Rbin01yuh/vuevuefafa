<script setup lang="ts">
import { provide, computed, reactive } from 'vue'
import { useId } from '../../composables/useId'

export interface VRadioGroupProps {
  /**
   * Group value (v-model)
   */
  modelValue?: string | number | boolean
  /**
   * Group name
   */
  name?: string
  /**
   * Group label
   */
  label?: string
  /**
   * Whether all radios are disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Layout direction
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<VRadioGroupProps>(), {
  disabled: false,
  direction: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const { id: groupId, generateId } = useId({ prefix: 'radio-group' })
const labelId = computed(() => (props.label ? generateId('label') : undefined))
const groupName = computed(() => props.name ?? groupId.value)

// Provide values to child radios
const groupValue = reactive({
  get value() {
    return props.modelValue
  },
})

provide('radioGroupValue', groupValue)
provide('radioGroupName', groupName.value)
provide('radioGroupDisabled', props.disabled)

const handleChange = (value: string | number | boolean) => {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('radioGroupChange', handleChange)
</script>

<template>
  <div :id="groupId" role="radiogroup" :aria-labelledby="labelId" :aria-disabled="disabled">
    <!-- Label -->
    <div v-if="label" :id="labelId" class="text-sm font-medium text-neutral-700 mb-2">
      {{ label }}
    </div>

    <!-- Radio options -->
    <div :class="['flex gap-3', direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col']">
      <slot />
    </div>
  </div>
</template>
