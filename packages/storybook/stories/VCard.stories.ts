import type { Meta, StoryObj } from '@storybook/vue3'
import { VCard, VButton } from 'vuevuefafa'

const meta: Meta<typeof VCard> = {
  title: 'Components/VCard',
  component: VCard,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    padded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VCard>

export const Default: Story = {
  render: () => ({
    components: { VCard },
    template: `
      <VCard style="max-width: 400px;">
        <h3 style="margin: 0 0 0.5rem; font-weight: 600;">Card Title</h3>
        <p style="margin: 0; color: #71717a;">
          This is a basic card with some content. Cards are useful for grouping related information.
        </p>
      </VCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  render: () => ({
    components: { VCard, VButton },
    template: `
      <VCard style="max-width: 400px;">
        <template #header>
          <h3 style="margin: 0; font-weight: 600;">User Profile</h3>
        </template>
        
        <p style="margin: 0; color: #71717a;">
          Manage your account settings and preferences here.
        </p>
        
        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <VButton variant="outline" size="sm">Cancel</VButton>
            <VButton size="sm">Save</VButton>
          </div>
        </template>
      </VCard>
    `,
  }),
}

export const Hoverable: Story = {
  render: () => ({
    components: { VCard },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <VCard hoverable>
          <h4 style="margin: 0 0 0.5rem;">Card 1</h4>
          <p style="margin: 0; color: #71717a; font-size: 0.875rem;">Hover over me!</p>
        </VCard>
        <VCard hoverable>
          <h4 style="margin: 0 0 0.5rem;">Card 2</h4>
          <p style="margin: 0; color: #71717a; font-size: 0.875rem;">Hover over me!</p>
        </VCard>
        <VCard hoverable>
          <h4 style="margin: 0 0 0.5rem;">Card 3</h4>
          <p style="margin: 0; color: #71717a; font-size: 0.875rem;">Hover over me!</p>
        </VCard>
      </div>
    `,
  }),
}

export const ShadowVariants: Story = {
  render: () => ({
    components: { VCard },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <VCard shadow="none" style="width: 150px;">
          <p style="margin: 0; text-align: center;">none</p>
        </VCard>
        <VCard shadow="sm" style="width: 150px;">
          <p style="margin: 0; text-align: center;">sm</p>
        </VCard>
        <VCard shadow="md" style="width: 150px;">
          <p style="margin: 0; text-align: center;">md</p>
        </VCard>
        <VCard shadow="lg" style="width: 150px;">
          <p style="margin: 0; text-align: center;">lg</p>
        </VCard>
        <VCard shadow="xl" style="width: 150px;">
          <p style="margin: 0; text-align: center;">xl</p>
        </VCard>
      </div>
    `,
  }),
}

export const NoBorder: Story = {
  args: {
    bordered: false,
    shadow: 'lg',
  },
  render: (args) => ({
    components: { VCard },
    setup() { return { args } },
    template: `
      <VCard v-bind="args" style="max-width: 400px;">
        <h3 style="margin: 0 0 0.5rem; font-weight: 600;">No Border</h3>
        <p style="margin: 0; color: #71717a;">This card has no border, only shadow.</p>
      </VCard>
    `,
  }),
}
