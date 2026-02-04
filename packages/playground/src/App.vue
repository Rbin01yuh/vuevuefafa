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

// Tab state
const activeTab = ref('overview')

// Country options
const countries = [
  { value: 'id', label: '🇮🇩 Indonesia' },
  { value: 'my', label: '🇲🇾 Malaysia' },
  { value: 'sg', label: '🇸🇬 Singapore' },
  { value: 'th', label: '🇹🇭 Thailand' },
  { value: 'vn', label: '🇻🇳 Vietnam' },
  { value: 'ph', label: '🇵🇭 Philippines' },
]

const handleSubmit = () => {
  showModal.value = true
}
</script>

<template>
  <div
    :class="['min-h-screen transition-all duration-300', isDark ? 'vvv-dark' : '']"
    :style="{
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
    }"
  >
    <!-- Animated Background Pattern -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        :class="[
          'absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse',
          isDark ? 'bg-purple-900/30' : 'bg-blue-200/50',
        ]"
      />
      <div
        :class="[
          'absolute top-1/2 -left-20 w-60 h-60 rounded-full blur-3xl animate-pulse',
          isDark ? 'bg-blue-900/20' : 'bg-purple-200/30',
        ]"
        style="animation-delay: 1s"
      />
      <div
        :class="[
          'absolute bottom-20 right-1/4 w-40 h-40 rounded-full blur-3xl animate-pulse',
          isDark ? 'bg-pink-900/20' : 'bg-pink-200/30',
        ]"
        style="animation-delay: 2s"
      />
    </div>

    <div class="relative z-10 px-4 py-8 md:px-8 lg:py-12">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <header class="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div class="text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <span class="text-2xl font-bold text-white">V</span>
              </div>
              <h1
                :class="[
                  'text-4xl font-bold bg-clip-text text-transparent',
                  isDark
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500',
                ]"
              >
                vuevuefafa
              </h1>
            </div>
            <p :class="['text-lg', isDark ? 'text-gray-400' : 'text-gray-600']">
              Production-ready Vue 3 UI Kit by <strong>Ridho Bintang Aulia</strong>
            </p>
          </div>

          <div class="flex items-center gap-3">
            <a
              href="https://github.com/Rbin01yuh/vuevuefafa"
              target="_blank"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all hover:scale-105',
                isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
              ]"
            >
              ⭐ GitHub
            </a>
            <VButton
              :variant="isDark ? 'secondary' : 'outline'"
              @click="toggleMode"
              class="shadow-lg"
            >
              {{ mode === 'dark' ? '☀️ Light' : mode === 'light' ? '🌙 Dark' : '🔄 Auto' }}
            </VButton>
          </div>
        </header>

        <!-- Stats Banner -->
        <div
          :class="[
            'grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl backdrop-blur-sm',
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/60 border border-gray-200 shadow-xl',
          ]"
        >
          <div class="text-center">
            <div :class="['text-3xl font-bold', isDark ? 'text-blue-400' : 'text-blue-600']">
              10
            </div>
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">Components</div>
          </div>
          <div class="text-center">
            <div :class="['text-3xl font-bold', isDark ? 'text-purple-400' : 'text-purple-600']">
              5
            </div>
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">Composables</div>
          </div>
          <div class="text-center">
            <div :class="['text-3xl font-bold', isDark ? 'text-pink-400' : 'text-pink-600']">
              100%
            </div>
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">TypeScript</div>
          </div>
          <div class="text-center">
            <div :class="['text-3xl font-bold', isDark ? 'text-green-400' : 'text-green-600']">
              A11y
            </div>
            <div :class="['text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">Accessible</div>
          </div>
        </div>

        <!-- Component Demos -->
        <div class="grid gap-8">
          <!-- Buttons -->
          <VCard
            :class="[
              'backdrop-blur-sm transition-all hover:shadow-2xl',
              isDark ? '!bg-gray-900/50 !border-gray-700' : '!bg-white/80',
            ]"
            shadow="lg"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🎨</span>
                <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">
                  Buttons
                </h2>
              </div>
            </template>

            <div class="space-y-6">
              <div>
                <p
                  :class="['text-sm mb-3 font-medium', isDark ? 'text-gray-400' : 'text-gray-500']"
                >
                  Variants
                </p>
                <div class="flex flex-wrap gap-3">
                  <VButton
                    variant="primary"
                    class="shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform"
                    >Primary</VButton
                  >
                  <VButton variant="secondary" class="hover:scale-105 transition-transform"
                    >Secondary</VButton
                  >
                  <VButton variant="outline" class="hover:scale-105 transition-transform"
                    >Outline</VButton
                  >
                  <VButton variant="ghost" class="hover:scale-105 transition-transform"
                    >Ghost</VButton
                  >
                  <VButton
                    variant="danger"
                    class="shadow-lg shadow-red-500/25 hover:scale-105 transition-transform"
                    >Danger</VButton
                  >
                </div>
              </div>

              <div>
                <p
                  :class="['text-sm mb-3 font-medium', isDark ? 'text-gray-400' : 'text-gray-500']"
                >
                  Sizes
                </p>
                <div class="flex flex-wrap items-center gap-3">
                  <VButton size="sm" variant="primary">Small</VButton>
                  <VButton size="md" variant="primary">Medium</VButton>
                  <VButton size="lg" variant="primary">Large</VButton>
                </div>
              </div>

              <div>
                <p
                  :class="['text-sm mb-3 font-medium', isDark ? 'text-gray-400' : 'text-gray-500']"
                >
                  States
                </p>
                <div class="flex flex-wrap gap-3">
                  <VButton loading variant="primary">Processing...</VButton>
                  <VButton disabled>Disabled</VButton>
                </div>
              </div>
            </div>
          </VCard>

          <!-- Form -->
          <VCard
            :class="[
              'backdrop-blur-sm transition-all hover:shadow-2xl',
              isDark ? '!bg-gray-900/50 !border-gray-700' : '!bg-white/80',
            ]"
            shadow="lg"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <span class="text-2xl">📝</span>
                <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">
                  Form Components
                </h2>
              </div>
            </template>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <div class="grid md:grid-cols-2 gap-5">
                <VInput v-model="name" label="Full Name" placeholder="Enter your name" required />

                <VInput
                  v-model="email"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  helper-text="We'll never share your email"
                />
              </div>

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
                <div class="grid md:grid-cols-3 gap-3">
                  <VRadio value="free" label="🆓 Free" description="Basic features" />
                  <VRadio value="pro" label="⭐ Pro" description="Advanced features" />
                  <VRadio value="enterprise" label="🏢 Enterprise" description="All features" />
                </div>
              </VRadioGroup>

              <VButton type="submit" block class="!py-3 text-lg shadow-lg shadow-blue-500/25">
                🚀 Submit Form
              </VButton>
            </form>
          </VCard>

          <!-- Tabs -->
          <VCard
            :class="[
              'backdrop-blur-sm transition-all hover:shadow-2xl',
              isDark ? '!bg-gray-900/50 !border-gray-700' : '!bg-white/80',
            ]"
            shadow="lg"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <span class="text-2xl">📑</span>
                <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">
                  Tabs
                </h2>
              </div>
            </template>

            <VTabs v-model="activeTab">
              <VTabList>
                <VTab value="overview">📖 Overview</VTab>
                <VTab value="features">✨ Features</VTab>
                <VTab value="pricing">💳 Pricing</VTab>
              </VTabList>
              <VTabPanels>
                <VTabPanel value="overview">
                  <div :class="['p-4 rounded-xl', isDark ? 'bg-gray-800/50' : 'bg-gray-50']">
                    <p :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
                      <strong>vuevuefafa</strong> is a production-ready Vue 3 UI Kit with
                      accessible, customizable components built with TypeScript and Tailwind CSS.
                      Created by <strong>Ridho Bintang Aulia</strong> in 2026.
                    </p>
                  </div>
                </VTabPanel>
                <VTabPanel value="features">
                  <div :class="['p-4 rounded-xl', isDark ? 'bg-gray-800/50' : 'bg-gray-50']">
                    <ul :class="['space-y-2', isDark ? 'text-gray-300' : 'text-gray-600']">
                      <li>✅ 10 accessible components</li>
                      <li>🌙 Dark mode support</li>
                      <li>🎨 Customizable theme with CSS variables</li>
                      <li>📘 Full TypeScript support</li>
                      <li>🌳 Tree-shakeable</li>
                      <li>♿ WCAG 2.1 AA compliant</li>
                    </ul>
                  </div>
                </VTabPanel>
                <VTabPanel value="pricing">
                  <div
                    :class="[
                      'p-4 rounded-xl text-center',
                      isDark ? 'bg-gray-800/50' : 'bg-gray-50',
                    ]"
                  >
                    <div
                      :class="[
                        'text-4xl font-bold mb-2',
                        isDark ? 'text-green-400' : 'text-green-600',
                      ]"
                    >
                      FREE
                    </div>
                    <p :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
                      vuevuefafa is free and open source, licensed under MIT.
                    </p>
                  </div>
                </VTabPanel>
              </VTabPanels>
            </VTabs>
          </VCard>

          <!-- Tooltips and Dropdowns -->
          <VCard
            :class="[
              'backdrop-blur-sm transition-all hover:shadow-2xl',
              isDark ? '!bg-gray-900/50 !border-gray-700' : '!bg-white/80',
            ]"
            shadow="lg"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <span class="text-2xl">💡</span>
                <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">
                  Tooltips & Dropdowns
                </h2>
              </div>
            </template>

            <div class="flex flex-wrap items-center gap-4">
              <VTooltip content="✨ This is a beautiful tooltip!">
                <VButton variant="outline" class="hover:scale-105 transition-transform"
                  >Hover me</VButton
                >
              </VTooltip>

              <VDropdown>
                <template #trigger="{ isOpen }">
                  <VButton variant="primary" class="shadow-lg shadow-blue-500/25">
                    Actions {{ isOpen ? '▲' : '▼' }}
                  </VButton>
                </template>
                <VDropdownItem>👤 Profile</VDropdownItem>
                <VDropdownItem>⚙️ Settings</VDropdownItem>
                <VDropdownItem>❓ Help</VDropdownItem>
                <VDropdownItem destructive>🚪 Sign out</VDropdownItem>
              </VDropdown>

              <VTooltip content="Top tooltip" placement="top">
                <VButton variant="ghost">Top</VButton>
              </VTooltip>

              <VTooltip content="Right tooltip" placement="right">
                <VButton variant="ghost">Right</VButton>
              </VTooltip>
            </div>
          </VCard>
        </div>

        <!-- Footer -->
        <footer class="mt-12 text-center">
          <p :class="['text-sm', isDark ? 'text-gray-500' : 'text-gray-400']">
            © 2026 vuevuefafa by <strong>Ridho Bintang Aulia</strong>. MIT License.
          </p>
        </footer>
      </div>
    </div>

    <!-- Success Modal -->
    <VModal v-model="showModal" title="🎉 Form Submitted!">
      <p :class="['mb-4', isDark ? 'text-gray-300' : 'text-gray-600']">
        Your form has been submitted successfully.
      </p>
      <div :class="['rounded-xl p-4 space-y-2', isDark ? 'bg-gray-800' : 'bg-gray-100']">
        <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          <strong>Name:</strong> {{ name || 'Not provided' }}
        </p>
        <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          <strong>Email:</strong> {{ email || 'Not provided' }}
        </p>
        <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          <strong>Country:</strong> {{ country || 'Not selected' }}
        </p>
        <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          <strong>Newsletter:</strong> {{ newsletter ? 'Yes ✅' : 'No' }}
        </p>
        <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          <strong>Plan:</strong> {{ plan.toUpperCase() }}
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <VButton variant="outline" @click="showModal = false">Cancel</VButton>
          <VButton @click="showModal = false">Done ✓</VButton>
        </div>
      </template>
    </VModal>
  </div>
</template>

<style>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 4s ease-in-out infinite;
}
</style>
