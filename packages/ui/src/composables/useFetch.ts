import { ref, shallowRef, readonly, type Ref, type DeepReadonly } from 'vue'

export interface UseFetchOptions<T> extends RequestInit {
  /**
   * Immediately execute fetch on creation
   * @default true
   */
  immediate?: boolean
  /**
   * Initial data value
   */
  initialData?: T
  /**
   * Timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  timeout?: number
  /**
   * Transform response before returning
   */
  transform?: (data: unknown) => T
  /**
   * Callback on success
   */
  onSuccess?: (data: T) => void
  /**
   * Callback on error
   */
  onError?: (error: Error) => void
  /**
   * Callback on finish (success or error)
   */
  onFinish?: () => void
}

export interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  isFinished: Ref<boolean>
  statusCode: Ref<number | null>
  execute: (url?: string) => Promise<T | null>
  abort: () => void
  canAbort: DeepReadonly<Ref<boolean>>
}

/**
 * Composable for type-safe data fetching with abort support
 *
 * @example
 * ```ts
 * const { data, error, isLoading, execute, abort } = useFetch<User[]>('/api/users')
 *
 * // Re-fetch data
 * await execute()
 *
 * // Abort the request
 * abort()
 * ```
 */
export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const {
    immediate = true,
    initialData = null,
    timeout = 30000,
    transform,
    onSuccess,
    onError,
    onFinish,
    ...fetchOptions
  } = options

  const data = shallowRef<T | null>(initialData as T | null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)
  const isFinished = ref(false)
  const statusCode = ref<number | null>(null)

  let abortController: AbortController | null = null
  const canAbort = ref(false)

  const abort = (): void => {
    if (abortController) {
      abortController.abort()
      abortController = null
      canAbort.value = false
    }
  }

  const execute = async (executeUrl?: string): Promise<T | null> => {
    const targetUrl = executeUrl || url

    // Abort any existing request
    abort()

    // Create new abort controller
    abortController = new AbortController()
    canAbort.value = true

    // Setup timeout
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        abort()
        error.value = new Error(`Request timeout after ${timeout}ms`)
      }, timeout)
    }

    // Reset state
    isLoading.value = true
    isFinished.value = false
    error.value = null

    try {
      const response = await fetch(targetUrl, {
        ...fetchOptions,
        signal: abortController.signal,
      })

      statusCode.value = response.status

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      let result: unknown

      // Try to parse as JSON, fall back to text
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        result = await response.json()
      } else {
        result = await response.text()
      }

      // Apply transform if provided
      const transformedData = transform ? transform(result) : (result as T)
      data.value = transformedData

      onSuccess?.(transformedData)

      return transformedData
    } catch (err) {
      // Don't set error if aborted
      if (err instanceof Error && err.name === 'AbortError') {
        return null
      }

      const fetchError = err instanceof Error ? err : new Error(String(err))
      error.value = fetchError
      onError?.(fetchError)

      return null
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
      isLoading.value = false
      isFinished.value = true
      canAbort.value = false
      abortController = null
      onFinish?.()
    }
  }

  // Execute immediately if configured
  if (immediate && url) {
    execute()
  }

  return {
    data,
    error,
    isLoading,
    isFinished,
    statusCode,
    execute,
    abort,
    canAbort: readonly(canAbort),
  }
}
