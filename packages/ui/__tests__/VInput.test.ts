import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VInput } from '../src/components/VInput'

describe('VInput', () => {
  it('renders input element', () => {
    const wrapper = mount(VInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('binds v-model value', async () => {
    const wrapper = mount(VInput, {
      props: {
        modelValue: 'initial',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial')

    await input.setValue('updated')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['updated'])
  })

  it('renders label when provided', () => {
    const wrapper = mount(VInput, {
      props: { label: 'Email Address' },
    })

    expect(wrapper.find('label').text()).toBe('Email Address')
  })

  it('shows required indicator', () => {
    const wrapper = mount(VInput, {
      props: { label: 'Email', required: true },
    })

    expect(wrapper.text()).toContain('*')
  })

  it('shows error message', () => {
    const wrapper = mount(VInput, {
      props: { error: 'This field is required' },
    })

    expect(wrapper.text()).toContain('This field is required')
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('shows helper text when no error', () => {
    const wrapper = mount(VInput, {
      props: { helperText: 'Enter your email' },
    })

    expect(wrapper.text()).toContain('Enter your email')
  })

  it('handles disabled state', () => {
    const wrapper = mount(VInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  it('shows clear button when clearable and has value', async () => {
    const wrapper = mount(VInput, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
    })

    expect(wrapper.find('[aria-label="Clear input"]').exists()).toBe(true)
  })

  it('clears input on clear button click', async () => {
    const wrapper = mount(VInput, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
    })

    await wrapper.find('[aria-label="Clear input"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('renders prefix slot', () => {
    const wrapper = mount(VInput, {
      slots: {
        prefix: '$',
      },
    })

    expect(wrapper.text()).toContain('$')
  })

  it('renders suffix slot', () => {
    const wrapper = mount(VInput, {
      slots: {
        suffix: 'kg',
      },
    })

    expect(wrapper.text()).toContain('kg')
  })

  it('has correct aria attributes for accessibility', () => {
    const wrapper = mount(VInput, {
      props: {
        label: 'Email',
        error: 'Invalid email',
        required: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-required')).toBe('true')
    expect(input.attributes('aria-describedby')).toBeDefined()
  })
})
