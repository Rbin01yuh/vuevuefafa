<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuevuefafa'

const { mode, toggleMode, isDark } = useTheme()

// Form state
const name = ref('')
const email = ref('')
const country = ref('')
const newsletter = ref(false)
const plan = ref('free')

// Modal state
const showModal = ref(false)

// Country options
const countries = [
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'th', label: 'Thailand' },
]

const handleSubmit = () => {
  showModal.value = true
}
</script>

<template>
  <div
    :class="[
      'min-h-screen p-8 transition-colors',
      isDark ? 'vvv-dark bg-neutral-900' : 'bg-gray-50',
    ]"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-neutral-900">vuevuefafa</h1>
          <p class="text-neutral-500">UI Kit Playground</p>
        </div>
        <VButton variant="outline" @click="toggleMode">
          {{ mode === 'dark' ? '☀️ Light' : mode === 'light' ? '🌙 Dark' : '🔄 Auto' }}
        </VButton>
      </header>

      <!-- Component Demos -->
      <div class="grid gap-8">
        <!-- Buttons -->
        <VCard>
          <template #header>
            <h2 class="text-lg font-semibold">Buttons</h2>
          </template>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <VButton variant="primary">Primary</VButton>
              <VButton variant="secondary">Secondary</VButton>
              <VButton variant="outline">Outline</VButton>
              <VButton variant="ghost">Ghost</VButton>
              <VButton variant="danger">Danger</VButton>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <VButton size="sm">Small</VButton>
              <VButton size="md">Medium</VButton>
              <VButton size="lg">Large</VButton>
            </div>

            <div class="flex flex-wrap gap-2">
              <VButton loading>Loading</VButton>
              <VButton disabled>Disabled</VButton>
            </div>
          </div>
        </VCard>

        <!-- Form -->
        <VCard>
          <template #header>
            <h2 class="text-lg font-semibold">Form Components</h2>
          </template>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <VInput v-model="name" label="Full Name" placeholder="Enter your name" required />

            <VInput
              v-model="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              helper-text="We'll never share your email"
            />

            <VSelect
              v-model="country"
              :options="countries"
              label="Country"
              placeholder="Select your country"
              clearable
              searchable
            />

            <VCheckbox
              v-model="newsletter"
              label="Subscribe to newsletter"
              description="Get updates about new features and releases"
            />

            <VRadioGroup v-model="plan" label="Select Plan">
              <VRadio value="free" label="Free" description="Basic features" />
              <VRadio value="pro" label="Pro" description="Advanced features" />
              <VRadio value="enterprise" label="Enterprise" description="All features" />
            </VRadioGroup>

            <VButton type="submit" block>Submit Form</VButton>
          </form>
        </VCard>

        <!-- Tabs -->
        <VCard>
          <template #header>
            <h2 class="text-lg font-semibold">Tabs</h2>
          </template>

          <VTabs>
            <VTabList>
              <VTab value="overview">Overview</VTab>
              <VTab value="features">Features</VTab>
              <VTab value="pricing">Pricing</VTab>
            </VTabList>
            <VTabPanels>
              <VTabPanel value="overview">
                <p class="text-neutral-600">
                  vuevuefafa is a production-ready Vue 3 UI Kit with accessible, customizable
                  components built with TypeScript and Tailwind CSS.
                </p>
              </VTabPanel>
              <VTabPanel value="features">
                <ul class="list-disc list-inside text-neutral-600 space-y-1">
                  <li>10 accessible components</li>
                  <li>Dark mode support</li>
                  <li>Customizable theme</li>
                  <li>TypeScript support</li>
                  <li>Tree-shakeable</li>
                </ul>
              </VTabPanel>
              <VTabPanel value="pricing">
                <p class="text-neutral-600">
                  vuevuefafa is free and open source, licensed under MIT.
                </p>
              </VTabPanel>
            </VTabPanels>
          </VTabs>
        </VCard>

        <!-- Tooltips and Dropdowns -->
        <VCard>
          <template #header>
            <h2 class="text-lg font-semibold">Tooltips & Dropdowns</h2>
          </template>

          <div class="flex flex-wrap items-center gap-4">
            <VTooltip content="This is a tooltip!">
              <VButton variant="outline">Hover me</VButton>
            </VTooltip>

            <VDropdown>
              <template #trigger="{ isOpen }">
                <VButton variant="outline"> Dropdown {{ isOpen ? '▲' : '▼' }} </VButton>
              </template>
              <VDropdownItem>Profile</VDropdownItem>
              <VDropdownItem>Settings</VDropdownItem>
              <VDropdownItem>Help</VDropdownItem>
              <VDropdownItem destructive>Sign out</VDropdownItem>
            </VDropdown>
          </div>
        </VCard>
      </div>

      <!-- Success Modal -->
      <VModal v-model="showModal" title="Form Submitted!">
        <p class="text-neutral-600 mb-4">Your form has been submitted successfully.</p>
        <div class="bg-neutral-100 rounded-lg p-4 text-sm">
          <p><strong>Name:</strong> {{ name || 'Not provided' }}</p>
          <p><strong>Email:</strong> {{ email || 'Not provided' }}</p>
          <p><strong>Country:</strong> {{ country || 'Not selected' }}</p>
          <p><strong>Newsletter:</strong> {{ newsletter ? 'Yes' : 'No' }}</p>
          <p><strong>Plan:</strong> {{ plan }}</p>
        </div>
        <template #footer>
          <div class="flex justify-end">
            <VButton @click="showModal = false">Close</VButton>
          </div>
        </template>
      </VModal>
    </div>
  </div>
</template>
