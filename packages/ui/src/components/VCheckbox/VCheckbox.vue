<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../../composables/useId'

export interface VCheckboxProps {
  /**
   * Checkbox value (v-model)
   */
  modelValue?: boolean
  /**
   * Indeterminate state
   * @default false
   */
  indeterminate?: boolean
  /**
   * Checkbox label
   */
  label?: string
  /**
   * Description text below label
   */
  description?: string
  /**
   * Whether checkbox is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Checkbox name attribute
   */
  name?: string
  /**
   * Value attribute for form submission
   */
  value?: string | number | boolean
}

const props = withDefaults(defineProps<VCheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const { id: checkboxId, generateId } = useId({ prefix: 'checkbox' })
const descriptionId = computed(() => (props.description ? generateId('desc') : undefined))

const isChecked = computed(() => props.modelValue)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<template>
  <label
    :class="['relative flex gap-3 cursor-pointer', { 'cursor-not-allowed opacity-50': disabled }]"
  >
    <!-- Checkbox input -->
    <div class="relative flex-shrink-0 mt-0.5">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="isChecked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        :name="name"
        :value="value"
        :aria-describedby="descriptionId"
        class="peer sr-only"
        @change="handleChange"
      />

      <!-- Custom checkbox -->
      <div
        :class="[
          'w-5 h-5 rounded border-2 transition-colors duration-fast',
          'flex items-center justify-center',
          // Unchecked
          'border-neutral-300 bg-white',
          // Checked/indeterminate
          'peer-checked:bg-primary-600 peer-checked:border-primary-600',
          'peer-indeterminate:bg-primary-600 peer-indeterminate:border-primary-600',
          // Focus
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
          // Hover
          'peer-hover:border-primary-500',
          // Disabled
          'peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200',
        ]"
      >
        <!-- Checkmark icon -->
        <svg
          v-if="isChecked && !indeterminate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-3.5 h-3.5 text-white"
        >
          <path
            fill-rule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Indeterminate icon -->
        <svg
          v-else-if="indeterminate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-3.5 h-3.5 text-white"
        >
          <path
            fill-rule="evenodd"
            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
            clip-rule="evenodd"
          />
        </svg>
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
