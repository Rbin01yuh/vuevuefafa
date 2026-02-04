import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VTabs, VTabList, VTab, VTabPanels, VTabPanel } from 'vuevuefafa'

const meta: Meta<typeof VTabs> = {
  title: 'Components/VTabs',
  component: VTabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VTabs>

export const Default: Story = {
  render: () => ({
    components: { VTabs, VTabList, VTab, VTabPanels, VTabPanel },
    setup() {
      const activeTab = ref('account')
      return { activeTab }
    },
    template: `
      <VTabs v-model="activeTab">
        <VTabList>
          <VTab value="account">Account</VTab>
          <VTab value="password">Password</VTab>
          <VTab value="notifications">Notifications</VTab>
        </VTabList>
        <VTabPanels>
          <VTabPanel value="account">
            <h4>Account Settings</h4>
            <p>Manage your account information and preferences.</p>
          </VTabPanel>
          <VTabPanel value="password">
            <h4>Password Settings</h4>
            <p>Update your password and security settings.</p>
          </VTabPanel>
          <VTabPanel value="notifications">
            <h4>Notification Settings</h4>
            <p>Configure how you receive notifications.</p>
          </VTabPanel>
        </VTabPanels>
      </VTabs>
    `,
  }),
}

export const DisabledTab: Story = {
  render: () => ({
    components: { VTabs, VTabList, VTab, VTabPanels, VTabPanel },
    template: `
      <VTabs>
        <VTabList>
          <VTab value="active">Active Tab</VTab>
          <VTab value="disabled" disabled>Disabled Tab</VTab>
          <VTab value="another">Another Tab</VTab>
        </VTabList>
        <VTabPanels>
          <VTabPanel value="active">
            <p>Content for the active tab.</p>
          </VTabPanel>
          <VTabPanel value="disabled">
            <p>This content is not reachable.</p>
          </VTabPanel>
          <VTabPanel value="another">
            <p>Content for another tab.</p>
          </VTabPanel>
        </VTabPanels>
      </VTabs>
    `,
  }),
}

export const LazyLoading: Story = {
  render: () => ({
    components: { VTabs, VTabList, VTab, VTabPanels, VTabPanel },
    template: `
      <VTabs lazy>
        <VTabList>
          <VTab value="tab1">Tab 1</VTab>
          <VTab value="tab2">Tab 2 (Lazy)</VTab>
          <VTab value="tab3">Tab 3 (Lazy)</VTab>
        </VTabList>
        <VTabPanels>
          <VTabPanel value="tab1">
            <p>This content loads immediately.</p>
          </VTabPanel>
          <VTabPanel value="tab2">
            <p>This content loads only when the tab is first viewed.</p>
          </VTabPanel>
          <VTabPanel value="tab3">
            <p>This content also loads lazily.</p>
          </VTabPanel>
        </VTabPanels>
      </VTabs>
    `,
  }),
}
