import { ref, type Ref } from 'vue'

let globalIdCounter = 0

export interface UseIdOptions {
  /**
   * Prefix for the generated ID
   * @default 'vvv'
   */
  prefix?: string
}

export interface UseIdReturn {
  id: Ref<string>
  generateId: (suffix?: string) => string
}

/**
 * Composable for generating unique IDs for ARIA attributes
 * Essential for accessibility in form elements and interactive components
 *
 * @example
 * ```ts
 * const { id, generateId } = useId({ prefix: 'input' })
 *
 * // Use in template
 * <label :for="id">Label</label>
 * <input :id="id" />
 *
 * // Generate related IDs
 * const errorId = generateId('error')  // 'input-1-error'
 * const descId = generateId('desc')    // 'input-1-desc'
 * ```
 */
export function useId(options: UseIdOptions = {}): UseIdReturn {
  const { prefix = 'vvv' } = options

  const uniqueId = ++globalIdCounter
  const id = ref(`${prefix}-${uniqueId}`)

  const generateId = (suffix?: string): string => {
    if (suffix) {
      return `${prefix}-${uniqueId}-${suffix}`
    }
    return `${prefix}-${uniqueId}`
  }

  return {
    id,
    generateId,
  }
}

/**
 * Generate a unique ID without using the composable
 * Useful for one-off ID generation
 */
export function generateUniqueId(prefix = 'vvv'): string {
  return `${prefix}-${++globalIdCounter}`
}
