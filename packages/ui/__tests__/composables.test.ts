import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useToggle } from '../src/composables/useToggle'
import { useId } from '../src/composables/useId'

describe('useToggle', () => {
  it('returns initial value as false by default', () => {
    const { value } = useToggle()
    expect(value.value).toBe(false)
  })

  it('respects initial value option', () => {
    const { value } = useToggle({ initialValue: true })
    expect(value.value).toBe(true)
  })

  it('toggles value', () => {
    const { value, toggle } = useToggle()
    expect(value.value).toBe(false)
    toggle()
    expect(value.value).toBe(true)
    toggle()
    expect(value.value).toBe(false)
  })

  it('sets value to true', () => {
    const { value, setTrue } = useToggle()
    setTrue()
    expect(value.value).toBe(true)
    setTrue() // Should stay true
    expect(value.value).toBe(true)
  })

  it('sets value to false', () => {
    const { value, setFalse } = useToggle({ initialValue: true })
    setFalse()
    expect(value.value).toBe(false)
    setFalse() // Should stay false
    expect(value.value).toBe(false)
  })

  it('sets arbitrary value', () => {
    const { value, set } = useToggle()
    set(true)
    expect(value.value).toBe(true)
    set(false)
    expect(value.value).toBe(false)
  })

  it('calls onToggle callback', () => {
    let callbackValue: boolean | undefined
    const { toggle } = useToggle({
      onToggle: (val) => {
        callbackValue = val
      },
    })
    toggle()
    expect(callbackValue).toBe(true)
    toggle()
    expect(callbackValue).toBe(false)
  })
})

describe('useId', () => {
  it('generates unique IDs', () => {
    const { id: id1 } = useId()
    const { id: id2 } = useId()
    expect(id1.value).not.toBe(id2.value)
  })

  it('uses custom prefix', () => {
    const { id } = useId({ prefix: 'custom' })
    expect(id.value).toMatch(/^custom-\d+$/)
  })

  it('generates related IDs with suffix', () => {
    const { id, generateId } = useId({ prefix: 'input' })
    const errorId = generateId('error')
    expect(errorId).toMatch(/^input-\d+-error$/)
    expect(errorId).toContain(id.value.split('-')[1])
  })
})
