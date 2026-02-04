<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, Teleport } from 'vue'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useId } from '../../composables/useId'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface VModalProps {
  /**
   * Whether modal is open (v-model)
   */
  modelValue?: boolean
  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize
  /**
   * Modal title (for aria-labelledby)
   */
  title?: string
  /**
   * Whether clicking backdrop closes modal
   * @default true
   */
  closeOnBackdrop?: boolean
  /**
   * Whether pressing Escape closes modal
   * @default true
   */
  closeOnEsc?: boolean
  /**
   * Whether to show close button
   * @default true
   */
  showClose?: boolean
  /**
   * Prevent body scroll when open
   * @default true
   */
  lockScroll?: boolean
  /**
   * Teleport target
   * @default 'body'
   */
  teleportTo?: string
}

const props = withDefaults(defineProps<VModalProps>(), {
  modelValue: false,
  size: 'md',
  closeOnBackdrop: true,
  closeOnEsc: true,
  showClose: true,
  lockScroll: true,
  teleportTo: 'body',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  'after-enter': []
  'after-leave': []
}>()

const modalRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const { id: modalId, generateId } = useId({ prefix: 'modal' })
const titleId = generateId('title')
const descriptionId = generateId('desc')

const { activate: activateTrap, deactivate: deactivateTrap } = useFocusTrap(modalRef, {
  escapeDeactivates: props.closeOnEsc,
  onEscape: () => {
    if (props.closeOnEsc) {
      close()
    }
  },
})

const sizeClasses = computed(() => {
  const sizes: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }
  return sizes[props.size]
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    close()
  }
}

const handleAfterEnter = () => {
  activateTrap()
  emit('after-enter')
}

const handleAfterLeave = () => {
  deactivateTrap()
  emit('after-leave')
}

// Lock body scroll
const lockBodyScroll = () => {
  if (props.lockScroll && typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const unlockBodyScroll = () => {
  if (props.lockScroll && typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    isVisible.value = newValue
    if (newValue) {
      lockBodyScroll()
      emit('open')
    } else {
      unlockBodyScroll()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.modelValue) {
    lockBodyScroll()
  }
})

onUnmounted(() => {
  unlockBodyScroll()
  deactivateTrap()
})

defineExpose({ close })
</script>

<template>
  <Teleport :to="teleportTo">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <div
        v-if="isVisible"
        :id="modalId"
        class="fixed inset-0 z-modal flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :aria-describedby="descriptionId"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          @click="handleBackdropClick"
        />

        <!-- Modal content -->
        <Transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isVisible"
            ref="modalRef"
            :class="[
              'relative w-full bg-white rounded-xl shadow-2xl',
              'max-h-[90vh] overflow-hidden flex flex-col',
              sizeClasses,
            ]"
          >
            <!-- Header -->
            <div
              v-if="title || showClose || $slots.header"
              class="flex items-center justify-between px-6 py-4 border-b border-neutral-200"
            >
              <slot name="header">
                <h2 v-if="title" :id="titleId" class="text-lg font-semibold text-neutral-900">
                  {{ title }}
                </h2>
                <span v-else />
              </slot>

              <button
                v-if="showClose"
                type="button"
                class="p-1 -mr-1 text-neutral-400 hover:text-neutral-600 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Close modal"
                @click="close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div :id="descriptionId" class="flex-1 overflow-y-auto px-6 py-4">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
