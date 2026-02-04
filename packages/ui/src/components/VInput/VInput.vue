<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { useId } from '../../composables/useId'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
export type InputSize = 'sm' | 'md' | 'lg'

export interface VInputProps {
  /**
   * Input value (v-model)
   */
  modelValue?: string | number
  /**
   * Input type
   * @default 'text'
   */
  type?: InputType
  /**
   * Input size
   * @default 'md'
   */
  size?: InputSize
  /**
   * Label text
   */
  label?: string
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Helper text shown below input
   */
  helperText?: string
  /**
   * Error message (also sets error state)
   */
  error?: string
  /**
   * Whether input is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether input is required
   * @default false
   */
  required?: boolean
  /**
   * Whether input is readonly
   * @default false
   */
  readonly?: boolean
  /**
   * Show clearable button
   * @default false
   */
  clearable?: boolean
  /**
   * Input name attribute
   */
  name?: string
  /**
   * Autocomplete attribute
   */
  autocomplete?: string
  /**
   * Maximum length
   */
  maxlength?: number
}

const props = withDefaults(defineProps<VInputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  required: false,
  readonly: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const slots = useSlots()
const inputRef = ref<HTMLInputElement | null>(null)

const { id: inputId, generateId } = useId({ prefix: 'input' })
const errorId = computed(() => (props.error ? generateId('error') : undefined))
const helperId = computed(() =>
  props.helperText && !props.error ? generateId('helper') : undefined
)

const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)
const hasError = computed(() => !!props.error)
const showClear = computed(
  () => props.clearable && props.modelValue && !props.disabled && !props.readonly
)

const sizeClasses = computed(() => {
  const sizes: Record<InputSize, { wrapper: string; input: string }> = {
    sm: { wrapper: 'h-8', input: 'text-sm px-2.5' },
    md: { wrapper: 'h-10', input: 'text-base px-3' },
    lg: { wrapper: 'h-12', input: 'text-lg px-4' },
  }
  return sizes[props.size]
})

const inputClasses = computed(() => [
  // Base
  'w-full bg-transparent outline-none',
  'placeholder:text-neutral-400',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // Size
  sizeClasses.value.input,
  // Padding adjustments for prefix/suffix
  { 'pl-0': hasPrefix.value },
  { 'pr-0': hasSuffix.value || showClear.value },
])

const wrapperClasses = computed(() => [
  // Base
  'flex items-center gap-2 rounded-lg border bg-white transition-colors duration-fast',
  sizeClasses.value.wrapper,
  // States
  hasError.value
    ? 'border-danger-500 focus-within:border-danger-500 focus-within:ring-1 focus-within:ring-danger-500'
    : 'border-neutral-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
  // Disabled
  { 'bg-neutral-50 cursor-not-allowed': props.disabled },
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

defineExpose({ focus, blur, inputRef })
</script>

<template>
  <div class="vvv-input-wrapper">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="block mb-1.5 text-sm font-medium text-neutral-700">
      {{ label }}
      <span v-if="required" class="text-danger-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Input wrapper -->
    <div :class="wrapperClasses">
      <!-- Prefix slot -->
      <span v-if="hasPrefix" class="flex-shrink-0 pl-3 text-neutral-500" aria-hidden="true">
        <slot name="prefix" />
      </span>

      <!-- Input element -->
      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :name="name"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :aria-invalid="hasError"
        :aria-describedby="errorId || helperId"
        :aria-required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Clear button -->
      <button
        v-if="showClear"
        type="button"
        class="flex-shrink-0 p-1 mr-1 text-neutral-400 hover:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
        aria-label="Clear input"
        @click="handleClear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Suffix slot -->
      <span v-if="hasSuffix" class="flex-shrink-0 pr-3 text-neutral-500" aria-hidden="true">
        <slot name="suffix" />
      </span>
    </div>

    <!-- Error message -->
    <p v-if="error" :id="errorId" class="mt-1.5 text-sm text-danger-600" role="alert">
      {{ error }}
    </p>

    <!-- Helper text -->
    <p v-else-if="helperText" :id="helperId" class="mt-1.5 text-sm text-neutral-500">
      {{ helperText }}
    </p>
  </div>
</template>
