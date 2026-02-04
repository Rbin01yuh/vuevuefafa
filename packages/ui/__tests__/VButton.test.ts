import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VButton } from '../src/components/VButton'

describe('VButton', () => {
  it('renders default button', () => {
    const wrapper = mount(VButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toContain('Click me')
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies variant classes', () => {
    const wrapper = mount(VButton, {
      props: { variant: 'primary' },
      slots: { default: 'Primary' },
    })

    expect(wrapper.classes()).toContain('bg-primary-600')
  })

  it('applies size classes', () => {
    const wrapper = mount(VButton, {
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })

    expect(wrapper.classes()).toContain('h-12')
  })

  it('handles disabled state', () => {
    const wrapper = mount(VButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })

    expect(wrapper.attributes('disabled')).toBe('')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('shows loading spinner', () => {
    const wrapper = mount(VButton, {
      props: { loading: true },
      slots: { default: 'Loading' },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('emits click event', async () => {
    const wrapper = mount(VButton, {
      slots: { default: 'Click' },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(VButton, {
      props: { disabled: true },
      slots: { default: 'Click' },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders icon slots', () => {
    const wrapper = mount(VButton, {
      slots: {
        default: 'With Icon',
        'icon-left': '<span class="test-icon">←</span>',
      },
    })

    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('applies block class when block prop is true', () => {
    const wrapper = mount(VButton, {
      props: { block: true },
      slots: { default: 'Block' },
    })

    expect(wrapper.classes()).toContain('w-full')
  })
})
