<script setup lang="ts">
export interface VDropdownItemProps {
  /**
   * Whether item is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether item is destructive (danger style)
   * @default false
   */
  destructive?: boolean
}

const props = withDefaults(defineProps<VDropdownItemProps>(), {
  disabled: false,
  destructive: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    type="button"
    role="menuitem"
    :disabled="disabled"
    :class="[
      'w-full px-3 py-2 text-left text-sm',
      'flex items-center gap-2',
      'transition-colors duration-fast',
      'focus:outline-none focus:bg-neutral-100',
      disabled
        ? 'text-neutral-400 cursor-not-allowed'
        : destructive
          ? 'text-danger-600 hover:bg-danger-50 focus:bg-danger-50'
          : 'text-neutral-700 hover:bg-neutral-100',
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
