import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VInput } from 'vuevuefafa'

const meta: Meta<typeof VInput> = {
  title: 'Components/VInput',
  component: VInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VInput>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<VInput v-bind="args" v-model="value" />',
  }),
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<VInput v-bind="args" v-model="value" />',
  }),
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<VInput v-bind="args" v-model="value" />',
  }),
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    modelValue: 'invalid-email',
  },
  render: (args) => ({
    components: { VInput },
    setup() { return { args } },
    template: '<VInput v-bind="args" />',
  }),
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<VInput v-bind="args" v-model="value" />',
  }),
}

export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    clearable: true,
    modelValue: 'Some text to clear',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<VInput v-bind="args" v-model="value" />',
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    modelValue: 'Cannot edit this',
    disabled: true,
  },
  render: (args) => ({
    components: { VInput },
    setup() { return { args } },
    template: '<VInput v-bind="args" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { VInput },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VInput v-model="sm" size="sm" placeholder="Small" />
        <VInput v-model="md" size="md" placeholder="Medium" />
        <VInput v-model="lg" size="lg" placeholder="Large" />
      </div>
    `,
  }),
}

export const WithPrefixSuffix: Story = {
  render: () => ({
    components: { VInput },
    setup() {
      const price = ref('')
      const url = ref('')
      return { price, url }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VInput v-model="price" label="Price" placeholder="0.00">
          <template #prefix>$</template>
        </VInput>
        <VInput v-model="url" label="Website" placeholder="example">
          <template #prefix>https://</template>
          <template #suffix>.com</template>
        </VInput>
      </div>
    `,
  }),
}
