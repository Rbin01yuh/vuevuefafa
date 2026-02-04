# vuevuefafa Documentation

Dokumentasi lengkap untuk **vuevuefafa** - Production-ready Vue 3 UI Kit.

> 📖 Dokumentasi online: [https://rbin01yuh.github.io/vuevuefafa](https://rbin01yuh.github.io/vuevuefafa)

---

## 📑 Table of Contents

1. [Quick Start](#-quick-start)
2. [Installation](#-installation)
3. [Usage](#-usage)
4. [Components](#-components)
5. [Composables](#-composables)
6. [Theming](#-theming)
7. [Dark Mode](#-dark-mode)
8. [Accessibility](#-accessibility)
9. [TypeScript](#-typescript)
10. [API Reference](#-api-reference)

---

## 🚀 Quick Start

```bash
npm install vuevuefafa
```

```ts
// main.ts
import { createApp } from 'vue'
import { VueVueVafa } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'
import App from './App.vue'

createApp(App).use(VueVueVafa).mount('#app')
```

```vue
<template>
  <VButton variant="primary">Hello World!</VButton>
</template>
```

---

## 📦 Installation

### npm

```bash
npm install vuevuefafa
```

### pnpm

```bash
pnpm add vuevuefafa
```

### yarn

```bash
yarn add vuevuefafa
```

---

## 💡 Usage

### Global Registration (Recommended)

Register all components globally:

```ts
import { createApp } from 'vue'
import { VueVueVafa } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'

const app = createApp(App)
app.use(VueVueVafa)
app.mount('#app')
```

### Individual Import (Tree-Shakeable)

Import only what you need:

```vue
<script setup>
import { VButton, VInput, VModal } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'
</script>

<template>
  <VButton>Click me</VButton>
</template>
```

---

## 🧩 Components

### VButton

Button dengan berbagai variants dan sizes.

```vue
<template>
  <!-- Variants -->
  <VButton variant="primary">Primary</VButton>
  <VButton variant="secondary">Secondary</VButton>
  <VButton variant="outline">Outline</VButton>
  <VButton variant="ghost">Ghost</VButton>
  <VButton variant="danger">Danger</VButton>

  <!-- Sizes -->
  <VButton size="sm">Small</VButton>
  <VButton size="md">Medium</VButton>
  <VButton size="lg">Large</VButton>

  <!-- States -->
  <VButton loading>Loading...</VButton>
  <VButton disabled>Disabled</VButton>
  <VButton block>Full Width</VButton>
</template>
```

#### Props

| Prop       | Type                                                           | Default     | Description          |
| ---------- | -------------------------------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Button size          |
| `loading`  | `boolean`                                                      | `false`     | Show loading spinner |
| `disabled` | `boolean`                                                      | `false`     | Disable button       |
| `block`    | `boolean`                                                      | `false`     | Full width           |
| `type`     | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | HTML type            |

---

### VInput

Text input dengan label, validation, dan clearable.

```vue
<template>
  <VInput v-model="name" label="Full Name" placeholder="Enter your name" required />

  <VInput
    v-model="email"
    type="email"
    label="Email"
    helper-text="We'll never share your email"
    clearable
  />

  <VInput
    v-model="password"
    type="password"
    label="Password"
    error="Password must be at least 8 characters"
  />
</template>
```

#### Props

| Prop          | Type      | Default  | Description           |
| ------------- | --------- | -------- | --------------------- |
| `modelValue`  | `string`  | `''`     | Input value (v-model) |
| `label`       | `string`  | -        | Label text            |
| `type`        | `string`  | `'text'` | Input type            |
| `placeholder` | `string`  | -        | Placeholder text      |
| `helperText`  | `string`  | -        | Helper text below     |
| `error`       | `string`  | -        | Error message         |
| `disabled`    | `boolean` | `false`  | Disable input         |
| `required`    | `boolean` | `false`  | Mark as required      |
| `clearable`   | `boolean` | `false`  | Show clear button     |

---

### VModal

Dialog modal dengan focus trap dan keyboard support.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <VButton @click="isOpen = true">Open Modal</VButton>

  <VModal v-model="isOpen" title="Confirm Action">
    <p>Are you sure you want to continue?</p>

    <template #footer>
      <VButton variant="outline" @click="isOpen = false">Cancel</VButton>
      <VButton @click="handleConfirm">Confirm</VButton>
    </template>
  </VModal>
</template>
```

#### Props

| Prop             | Type                                     | Default | Description            |
| ---------------- | ---------------------------------------- | ------- | ---------------------- |
| `modelValue`     | `boolean`                                | `false` | Open state (v-model)   |
| `title`          | `string`                                 | -       | Modal title            |
| `size`           | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Modal size             |
| `closable`       | `boolean`                                | `true`  | Show close button      |
| `closeOnEsc`     | `boolean`                                | `true`  | Close on Escape key    |
| `closeOnOverlay` | `boolean`                                | `true`  | Close on overlay click |

---

### VCard

Container dengan optional header dan footer.

```vue
<template>
  <VCard shadow="lg" hoverable>
    <template #header>
      <h3>Card Title</h3>
    </template>

    <p>Card content goes here...</p>

    <template #footer>
      <VButton size="sm">Action</VButton>
    </template>
  </VCard>
</template>
```

---

### VSelect

Dropdown select dengan search dan multi-select.

```vue
<script setup>
import { ref } from 'vue'

const country = ref('')
const countries = [
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
]
</script>

<template>
  <VSelect
    v-model="country"
    :options="countries"
    label="Country"
    placeholder="Select country"
    searchable
    clearable
  />
</template>
```

---

### VCheckbox

Checkbox dengan indeterminate state support.

```vue
<template>
  <VCheckbox
    v-model="agreed"
    label="I agree to terms"
    description="Read our terms and conditions"
  />
</template>
```

---

### VRadio & VRadioGroup

Radio buttons dengan group support.

```vue
<template>
  <VRadioGroup v-model="plan" label="Select Plan">
    <VRadio value="free" label="Free" description="Basic features" />
    <VRadio value="pro" label="Pro" description="All features" />
  </VRadioGroup>
</template>
```

---

### VTabs

Tab navigation dengan lazy loading.

```vue
<template>
  <VTabs v-model="activeTab">
    <VTabList>
      <VTab value="tab1">Tab 1</VTab>
      <VTab value="tab2">Tab 2</VTab>
    </VTabList>
    <VTabPanels>
      <VTabPanel value="tab1">Content 1</VTabPanel>
      <VTabPanel value="tab2">Content 2</VTabPanel>
    </VTabPanels>
  </VTabs>
</template>
```

---

### VDropdown

Menu dropdown dengan keyboard navigation.

```vue
<template>
  <VDropdown>
    <template #trigger="{ isOpen }">
      <VButton>Menu {{ isOpen ? '▲' : '▼' }}</VButton>
    </template>
    <VDropdownItem @click="handleProfile">Profile</VDropdownItem>
    <VDropdownItem @click="handleSettings">Settings</VDropdownItem>
    <VDropdownItem destructive @click="handleLogout">Logout</VDropdownItem>
  </VDropdown>
</template>
```

---

### VTooltip

Tooltip dengan placement options.

```vue
<template>
  <VTooltip content="This is a tooltip" placement="top">
    <VButton>Hover me</VButton>
  </VTooltip>
</template>
```

---

## 🎣 Composables

### useTheme

Theme management untuk dark mode.

```ts
import { useTheme } from 'vuevuefafa'

const { mode, isDark, toggleMode, setMode } = useTheme()

// Toggle dark mode
toggleMode()

// Set specific mode
setMode('dark') // 'light' | 'dark' | 'auto'
```

### useToggle

Boolean state management.

```ts
import { useToggle } from 'vuevuefafa'

const [isOpen, toggle, setOpen] = useToggle(false)

toggle() // Toggle state
setOpen(true) // Set specific value
```

### useFocusTrap

Focus trapping untuk modals/dialogs.

```ts
import { useFocusTrap } from 'vuevuefafa'

const containerRef = ref<HTMLElement>()
const { activate, deactivate } = useFocusTrap(containerRef)
```

### useFetch

Type-safe data fetching.

```ts
import { useFetch } from 'vuevuefafa'

const { data, loading, error, execute } = useFetch<User[]>('/api/users')
```

### useId

Generate unique IDs untuk ARIA.

```ts
import { useId } from 'vuevuefafa'

const { id, generateId } = useId({ prefix: 'modal' })
// id = 'modal-abc123'
```

---

## 🎨 Theming

vuevuefafa menggunakan CSS Variables untuk theming.

### Override CSS Variables

```css
:root {
  /* Primary colors */
  --vvv-primary-500: #8b5cf6;
  --vvv-primary-600: #7c3aed;

  /* Border radius */
  --vvv-radius-lg: 0.75rem;

  /* Shadows */
  --vvv-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### Runtime Theming

```ts
import { useTheme } from 'vuevuefafa'

const { applyTheme } = useTheme()

applyTheme({
  primary: '#8b5cf6',
  radius: '0.75rem',
})
```

---

## 🌙 Dark Mode

### Enable Dark Mode

Add class `vvv-dark` to container:

```vue
<div :class="{ 'vvv-dark': isDark }">
  <!-- Components will use dark theme -->
</div>
```

### Using useTheme

```ts
import { useTheme } from 'vuevuefafa'

const { isDark, toggleMode, setMode } = useTheme()

// Toggle
toggleMode()

// Set specific mode
setMode('dark')
setMode('light')
setMode('auto') // Follow system preference
```

---

## ♿ Accessibility

Semua komponen vuevuefafa mengikuti **WCAG 2.1 Level AA**:

- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast ratios

---

## 🔷 TypeScript

vuevuefafa fully typed dengan TypeScript:

```ts
import type {
  VButtonProps,
  VInputProps,
  VModalProps,
  VSelectProps,
  SelectOption,
  ThemeConfig,
} from 'vuevuefafa'

// Use types in your components
const buttonProps: VButtonProps = {
  variant: 'primary',
  size: 'md',
}
```

---

## 📚 API Reference

Untuk API reference lengkap, kunjungi:

- 📖 [Online Docs](https://rbin01yuh.github.io/vuevuefafa)
- 📝 [Component Docs](./packages/docs/components/)
- 🎨 [Storybook](./packages/storybook/)

---

## 📄 License

[MIT](./LICENSE) © 2026 Ridho Bintang Aulia

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/Rbin01yuh">Ridho Bintang Aulia</a></sub>
</div>
