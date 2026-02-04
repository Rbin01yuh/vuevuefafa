import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VModal } from '../src/components/VModal'

describe('VModal', () => {
  it('renders when modelValue is true', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true },
      slots: { default: 'Modal content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.text()).toContain('Modal content')
  })

  it('does not render when modelValue is false', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: false },
      slots: { default: 'Modal content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.text()).not.toContain('Modal content')
  })

  it('has correct aria attributes', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true, title: 'Test Modal' },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-labelledby')).toBeDefined()
  })

  it('renders title when provided', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true, title: 'My Modal' },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.text()).toContain('My Modal')
  })

  it('shows close button by default', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.find('[aria-label="Close modal"]').exists()).toBe(true)
  })

  it('hides close button when showClose is false', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true, showClose: false },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.find('[aria-label="Close modal"]').exists()).toBe(false)
  })

  it('emits update:modelValue and close on close button click', async () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    await wrapper.find('[aria-label="Close modal"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('applies size classes', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true, size: 'lg' },
      slots: { default: 'Content' },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.html()).toContain('max-w-lg')
  })

  it('renders header slot', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true },
      slots: {
        default: 'Content',
        header: '<div class="custom-header">Custom Header</div>',
      },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mount(VModal, {
      props: { modelValue: true },
      slots: {
        default: 'Content',
        footer: '<div class="custom-footer">Footer</div>',
      },
      global: {
        stubs: { teleport: true },
      },
    })

    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })
})
