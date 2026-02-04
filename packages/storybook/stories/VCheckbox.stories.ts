import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VCheckbox } from 'vuevuefafa'

const meta: Meta<typeof VCheckbox> = {
  title: 'Components/VCheckbox',
  component: VCheckbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VCheckbox>

export const Default: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: '<VCheckbox v-model="checked" label="Accept terms and conditions" />',
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const checked = ref(true)
      return { checked }
    },
    template: '<VCheckbox v-model="checked" label="Already checked" />',
  }),
}

export const Indeterminate: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: '<VCheckbox v-model="checked" label="Indeterminate state" indeterminate />',
  }),
}

export const WithDescription: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: `
      <VCheckbox 
        v-model="checked" 
        label="Email notifications"
        description="Receive email updates about your account activity"
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { VCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VCheckbox :model-value="false" label="Disabled unchecked" disabled />
        <VCheckbox :model-value="true" label="Disabled checked" disabled />
      </div>
    `,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const options = ref({
        email: false,
        sms: false,
        push: true,
      })
      return { options }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <p style="margin: 0; font-weight: 500;">Notification preferences:</p>
        <VCheckbox v-model="options.email" label="Email" />
        <VCheckbox v-model="options.sms" label="SMS" />
        <VCheckbox v-model="options.push" label="Push notifications" />
      </div>
    `,
  }),
}
