<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useId } from '../../composables/useId'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface VSelectProps {
  /**
   * Selected value (v-model)
   */
  modelValue?: string | number | (string | number)[]
  /**
   * Select options
   */
  options?: SelectOption[]
  /**
   * Placeholder text
   * @default 'Select an option'
   */
  placeholder?: string
  /**
   * Label text
   */
  label?: string
  /**
   * Error message
   */
  error?: string
  /**
   * Helper text
   */
  helperText?: string
  /**
   * Whether select is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether select is required
   * @default false
   */
  required?: boolean
  /**
   * Allow multiple selection
   * @default false
   */
  multiple?: boolean
  /**
   * Enable search/filter
   * @default false
   */
  searchable?: boolean
  /**
   * Async options loader
   */
  loadOptions?: (search: string) => Promise<SelectOption[]>
  /**
   * Loading state
   * @default false
   */
  loading?: boolean
  /**
   * Clear button
   * @default false
   */
  clearable?: boolean
}

const props = withDefaults(defineProps<VSelectProps>(), {
  placeholder: 'Select an option',
  options: () => [],
  disabled: false,
  required: false,
  multiple: false,
  searchable: false,
  loading: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  change: [value: string | number | (string | number)[] | undefined]
  search: [query: string]
  open: []
  close: []
}>()

const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const focusedIndex = ref(-1)
const asyncOptions = ref<SelectOption[]>([])
const isLoadingAsync = ref(false)

const { id: selectId, generateId } = useId({ prefix: 'select' })
const labelId = generateId('label')
const menuId = generateId('menu')
const errorId = computed(() => (props.error ? generateId('error') : undefined))

const hasError = computed(() => !!props.error)

const allOptions = computed(() => {
  if (props.loadOptions) {
    return asyncOptions.value
  }
  return props.options
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return allOptions.value
  }
  const query = searchQuery.value.toLowerCase()
  return allOptions.value.filter((opt) => opt.label.toLowerCase().includes(query))
})

const selectedOption = computed(() => {
  if (props.multiple) {
    return allOptions.value.filter((opt) =>
      (props.modelValue as (string | number)[])?.includes(opt.value)
    )
  }
  return allOptions.value.find((opt) => opt.value === props.modelValue)
})

const displayValue = computed(() => {
  if (props.multiple) {
    const selected = selectedOption.value as SelectOption[]
    if (!selected || selected.length === 0) return ''
    if (selected.length === 1) return selected[0].label
    return `${selected.length} selected`
  }
  return (selectedOption.value as SelectOption | undefined)?.label || ''
})

const open = async () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  focusedIndex.value = -1
  emit('open')

  if (props.loadOptions && asyncOptions.value.length === 0) {
    await loadAsyncOptions('')
  }

  nextTick(() => {
    if (props.searchable) {
      searchInputRef.value?.focus()
    } else {
      menuRef.value?.focus()
    }
  })
}

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  searchQuery.value = ''
  focusedIndex.value = -1
  emit('close')
}

const toggle = () => {
  isOpen.value ? close() : open()
}

const loadAsyncOptions = async (query: string) => {
  if (!props.loadOptions) return

  isLoadingAsync.value = true
  try {
    asyncOptions.value = await props.loadOptions(query)
  } catch {
    asyncOptions.value = []
  } finally {
    isLoadingAsync.value = false
  }
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return

  if (props.multiple) {
    const currentValue = (props.modelValue as (string | number)[]) || []
    const newValue = currentValue.includes(option.value)
      ? currentValue.filter((v) => v !== option.value)
      : [...currentValue, option.value]
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    close()
  }
}

const isSelected = (option: SelectOption) => {
  if (props.multiple) {
    return (props.modelValue as (string | number)[])?.includes(option.value)
  }
  return props.modelValue === option.value
}

const clearSelection = () => {
  emit('update:modelValue', props.multiple ? [] : undefined)
  emit('change', props.multiple ? [] : undefined)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      open()
    }
    return
  }

  const options = filteredOptions.value.filter((o) => !o.disabled)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedIndex.value = Math.min(focusedIndex.value + 1, options.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (focusedIndex.value >= 0 && options[focusedIndex.value]) {
        selectOption(options[focusedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.focus()
      break
    case 'Home':
      event.preventDefault()
      focusedIndex.value = 0
      break
    case 'End':
      event.preventDefault()
      focusedIndex.value = options.length - 1
      break
  }
}

const handleSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('search', value)

  if (props.loadOptions) {
    loadAsyncOptions(value)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (triggerRef.value?.contains(target) || menuRef.value?.contains(target)) {
    return
  }
  close()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ open, close, toggle })
</script>

<template>
  <div class="vvv-select-wrapper">
    <!-- Label -->
    <label
      v-if="label"
      :id="labelId"
      :for="selectId"
      class="block mb-1.5 text-sm font-medium text-neutral-700"
    >
      {{ label }}
      <span v-if="required" class="text-danger-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Select trigger -->
    <div
      :id="selectId"
      ref="triggerRef"
      role="combobox"
      tabindex="0"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      :aria-controls="menuId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-invalid="hasError"
      :aria-describedby="errorId"
      :aria-disabled="disabled"
      :aria-required="required"
      :class="[
        'relative flex items-center h-10 px-3 rounded-lg border bg-white cursor-pointer',
        'transition-colors duration-fast',
        hasError
          ? 'border-danger-500 focus:border-danger-500 focus:ring-1 focus:ring-danger-500'
          : 'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
        disabled && 'bg-neutral-50 cursor-not-allowed opacity-50',
        'focus:outline-none',
      ]"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span
        :class="[
          'flex-1 truncate text-left',
          displayValue ? 'text-neutral-900' : 'text-neutral-400',
        ]"
      >
        {{ displayValue || placeholder }}
      </span>

      <!-- Clear button -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="p-1 -mr-1 text-neutral-400 hover:text-neutral-600"
        aria-label="Clear selection"
        @click.stop="clearSelection"
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

      <!-- Chevron icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        :class="[
          'w-5 h-5 ml-2 text-neutral-400 transition-transform duration-fast',
          isOpen && 'rotate-180',
        ]"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Dropdown menu -->
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
        role="listbox"
        tabindex="-1"
        :aria-multiselectable="multiple"
        :class="[
          'absolute z-dropdown w-full mt-1',
          'bg-white rounded-lg shadow-lg border border-neutral-200',
          'max-h-60 overflow-auto focus:outline-none',
        ]"
        @keydown="handleKeydown"
      >
        <!-- Search input -->
        <div v-if="searchable" class="p-2 border-b border-neutral-200">
          <input
            ref="searchInputRef"
            type="text"
            :value="searchQuery"
            placeholder="Search..."
            class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            @input="handleSearch"
          />
        </div>

        <!-- Loading state -->
        <div v-if="loading || isLoadingAsync" class="px-3 py-6 text-center text-neutral-500">
          <svg
            class="animate-spin h-5 w-5 mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>

        <!-- Options list -->
        <ul v-else-if="filteredOptions.length > 0" class="py-1">
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            role="option"
            :aria-selected="isSelected(option)"
            :aria-disabled="option.disabled"
            :class="[
              'px-3 py-2 cursor-pointer flex items-center gap-2',
              'transition-colors duration-fast',
              option.disabled
                ? 'text-neutral-400 cursor-not-allowed'
                : focusedIndex === index
                  ? 'bg-primary-50 text-primary-900'
                  : isSelected(option)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-900 hover:bg-neutral-100',
            ]"
            @click="selectOption(option)"
            @mouseenter="focusedIndex = index"
          >
            <!-- Checkbox for multiple -->
            <span
              v-if="multiple"
              :class="[
                'w-4 h-4 border rounded flex items-center justify-center flex-shrink-0',
                isSelected(option) ? 'bg-primary-600 border-primary-600' : 'border-neutral-300',
              ]"
            >
              <svg
                v-if="isSelected(option)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-3 h-3 text-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>

            <span class="flex-1">{{ option.label }}</span>

            <!-- Checkmark for single -->
            <svg
              v-if="!multiple && isSelected(option)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 text-primary-600"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
        </ul>

        <!-- Empty state -->
        <div v-else class="px-3 py-6 text-center text-neutral-500">No options available</div>
      </div>
    </Transition>

    <!-- Error message -->
    <p v-if="error" :id="errorId" class="mt-1.5 text-sm text-danger-600" role="alert">
      {{ error }}
    </p>

    <!-- Helper text -->
    <p v-else-if="helperText" class="mt-1.5 text-sm text-neutral-500">
      {{ helperText }}
    </p>
  </div>
</template>
