import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VSelect } from 'vuevuefafa'

const meta: Meta<typeof VSelect> = {
  title: 'Components/VSelect',
  component: VSelect,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VSelect>

const countries = [
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'th', label: 'Thailand' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'ph', label: 'Philippines' },
]

export const Default: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('')
      return { value, countries }
    },
    template: `
      <VSelect 
        v-model="value" 
        :options="countries" 
        label="Country"
        placeholder="Select a country"
      />
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('')
      return { value, countries }
    },
    template: `
      <VSelect 
        v-model="value" 
        :options="countries" 
        label="Country"
        error="Please select a country"
        placeholder="Select a country"
      />
    `,
  }),
}

export const Searchable: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('')
      return { value, countries }
    },
    template: `
      <VSelect 
        v-model="value" 
        :options="countries" 
        label="Country"
        placeholder="Search and select..."
        searchable
      />
    `,
  }),
}

export const MultiSelect: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const values = ref<string[]>([])
      return { values, countries }
    },
    template: `
      <VSelect 
        v-model="values" 
        :options="countries" 
        label="Countries"
        placeholder="Select multiple countries"
        multiple
      />
    `,
  }),
}

export const Clearable: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('id')
      return { value, countries }
    },
    template: `
      <VSelect 
        v-model="value" 
        :options="countries" 
        label="Country"
        clearable
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('id')
      return { value, countries }
    },
    template: `
      <VSelect 
        v-model="value" 
        :options="countries" 
        label="Country"
        disabled
      />
    `,
  }),
}

export const AsyncOptions: Story = {
  render: () => ({
    components: { VSelect },
    setup() {
      const value = ref('')
      
      const loadOptions = async (search: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        return countries.filter(c => 
          c.label.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      return { value, loadOptions }
    },
    template: `
      <VSelect 
        v-model="value" 
        :load-options="loadOptions"
        label="Country (Async)"
        placeholder="Type to search..."
        searchable
      />
    `,
  }),
}
