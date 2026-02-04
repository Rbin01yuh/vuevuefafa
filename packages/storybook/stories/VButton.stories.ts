import type { Meta, StoryObj } from '@storybook/vue3'
import { VButton } from 'vuevuefafa'

const meta: Meta<typeof VButton> = {
  title: 'Components/VButton',
  component: VButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VButton>

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Primary Button',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary Button',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    default: 'Outline Button',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    default: 'Ghost Button',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    default: 'Delete',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { VButton },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <VButton size="sm">Small</VButton>
        <VButton size="md">Medium</VButton>
        <VButton size="lg">Large</VButton>
      </div>
    `,
  }),
}

export const Loading: Story = {
  args: {
    loading: true,
    default: 'Loading...',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const Block: Story = {
  args: {
    block: true,
    default: 'Full Width Button',
  },
  render: (args) => ({
    components: { VButton },
    setup() { return { args } },
    template: '<VButton v-bind="args">{{ args.default }}</VButton>',
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { VButton },
    template: `
      <div style="display: flex; gap: 1rem;">
        <VButton>
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 1rem; height: 1rem;">
              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
          </template>
          With Left Icon
        </VButton>
        <VButton variant="outline">
          With Right Icon
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 1rem; height: 1rem;">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </template>
        </VButton>
      </div>
    `,
  }),
}
