import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VModal, VButton } from 'vuevuefafa'

const meta: Meta<typeof VModal> = {
  title: 'Components/VModal',
  component: VModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VModal>

export const Default: Story = {
  render: () => ({
    components: { VModal, VButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <VButton @click="isOpen = true">Open Modal</VButton>
        <VModal v-model="isOpen" title="Example Modal">
          <p>This is the modal content. You can put anything here.</p>
        </VModal>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { VModal, VButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <VButton @click="isOpen = true">Open Modal</VButton>
        <VModal v-model="isOpen" title="Confirm Action">
          <p>Are you sure you want to proceed with this action?</p>
          <template #footer>
            <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
              <VButton variant="outline" @click="isOpen = false">Cancel</VButton>
              <VButton @click="isOpen = false">Confirm</VButton>
            </div>
          </template>
        </VModal>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { VModal, VButton },
    setup() {
      const size = ref<string | null>(null)
      return { size }
    },
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <VButton @click="size = 'sm'">Small</VButton>
        <VButton @click="size = 'md'">Medium</VButton>
        <VButton @click="size = 'lg'">Large</VButton>
        <VButton @click="size = 'xl'">X-Large</VButton>
        <VModal v-model="size" :size="size || 'md'" :title="'Size: ' + size">
          <p>This modal is using the {{ size }} size variant.</p>
        </VModal>
      </div>
    `,
  }),
}

export const NoCloseButton: Story = {
  render: () => ({
    components: { VModal, VButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <VButton @click="isOpen = true">Open Modal</VButton>
        <VModal v-model="isOpen" title="No Close Button" :show-close="false">
          <p>This modal has no close button. Click outside or press Escape to close.</p>
        </VModal>
      </div>
    `,
  }),
}

export const PersistentModal: Story = {
  render: () => ({
    components: { VModal, VButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <VButton @click="isOpen = true">Open Persistent Modal</VButton>
        <VModal 
          v-model="isOpen" 
          title="Persistent Modal"
          :close-on-backdrop="false"
          :close-on-esc="false"
        >
          <p>This modal can only be closed by clicking the button below.</p>
          <template #footer>
            <VButton @click="isOpen = false" block>Close Modal</VButton>
          </template>
        </VModal>
      </div>
    `,
  }),
}
