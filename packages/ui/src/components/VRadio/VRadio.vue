<script setup lang="ts">
import { computed, inject } from 'vue'
import { useId } from '../../composables/useId'

export interface VRadioProps {
  /**
   * Radio value (v-model)
   */
  modelValue?: string | number | boolean
  /**
   * Radio value for this option
   */
  value: string | number | boolean
  /**
   * Radio label
   */
  label?: string
  /**
   * Description text below label
   */
  description?: string
  /**
   * Whether radio is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Radio name attribute
   */
  name?: string
}

const props = withDefaults(defineProps<VRadioProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

// Inject from radio group if available
const groupModelValue = inject<{ value: string | number | boolean } | undefined>(
  'radioGroupValue',
  undefined
)
const groupName = inject<string | undefined>('radioGroupName', undefined)
const groupDisabled = inject<boolean | undefined>('radioGroupDisabled', undefined)

const { id: radioId, generateId } = useId({ prefix: 'radio' })
const descriptionId = computed(() => (props.description ? generateId('desc') : undefined))

const actualValue = computed(() => groupModelValue?.value ?? props.modelValue)
const actualName = computed(() => groupName ?? props.name)
const isDisabled = computed(() => groupDisabled ?? props.disabled)
const isChecked = computed(() => actualValue.value === props.value)

const handleChange = () => {
  if (!isDisabled.value) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label
    :class="['relative flex gap-3 cursor-pointer', { 'cursor-not-allowed opacity-50': isDisabled }]"
  >
    <!-- Radio input -->
    <div class="relative flex-shrink-0 mt-0.5">
      <input
        :id="radioId"
        type="radio"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="actualName"
        :value="value"
        :aria-describedby="descriptionId"
        class="peer sr-only"
        @change="handleChange"
      />

      <!-- Custom radio -->
      <div
        :class="[
          'w-5 h-5 rounded-full border-2 transition-colors duration-fast',
          'flex items-center justify-center',
          // Unchecked
          'border-neutral-300 bg-white',
          // Checked
          'peer-checked:border-primary-600',
          // Focus
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
          // Hover
          'peer-hover:border-primary-500',
          // Disabled
          'peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200',
        ]"
      >
        <!-- Inner dot -->
        <div
          v-if="isChecked"
          class="w-2.5 h-2.5 rounded-full bg-primary-600 transition-transform duration-fast"
        />
      </div>
    </div>

    <!-- Label and description -->
    <div v-if="label || description || $slots.default">
      <div class="text-sm font-medium text-neutral-900">
        <slot>{{ label }}</slot>
      </div>
      <p v-if="description" :id="descriptionId" class="text-sm text-neutral-500 mt-0.5">
        {{ description }}
      </p>
    </div>
  </label>
</template>
