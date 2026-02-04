# vuevuefafa Documentation

Dokumentasi lengkap untuk **vuevuefafa** - Production-ready Vue 3 UI Kit.

> 🛠️ Created by **Ridho Bintang Aulia** | © 2026

---

## 📑 Daftar Isi

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Components](#-components)
  - [VButton](#vbutton)
  - [VInput](#vinput)
  - [VModal](#vmodal)
  - [VCard](#vcard)
  - [VSelect](#vselect)
  - [VCheckbox](#vcheckbox)
  - [VRadio & VRadioGroup](#vradio--vradiogroup)
  - [VTabs](#vtabs)
  - [VDropdown](#vdropdown)
  - [VTooltip](#vtooltip)
- [Composables](#-composables)
- [Theming](#-theming)
- [Dark Mode](#-dark-mode)
- [Accessibility](#-accessibility)
- [TypeScript](#-typescript)

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

```ts
import { createApp } from 'vue'
import { VueVueVafa } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'

const app = createApp(App)
app.use(VueVueVafa)
app.mount('#app')
```

### Individual Import (Tree-Shakeable)

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

#### Props

| Prop        | Type                                     | Default | Description  |
| ----------- | ---------------------------------------- | ------- | ------------ |
| `shadow`    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`  | Shadow size  |
| `bordered`  | `boolean`                                | `true`  | Show border  |
| `hoverable` | `boolean`                                | `false` | Hover effect |
| `padded`    | `boolean`                                | `true`  | Add padding  |

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

#### Props

| Prop          | Type             | Default | Description       |
| ------------- | ---------------- | ------- | ----------------- |
| `modelValue`  | `any`            | -       | Selected value    |
| `options`     | `SelectOption[]` | `[]`    | Options array     |
| `label`       | `string`         | -       | Label text        |
| `placeholder` | `string`         | -       | Placeholder       |
| `searchable`  | `boolean`        | `false` | Enable search     |
| `clearable`   | `boolean`        | `false` | Show clear button |
| `multiple`    | `boolean`        | `false` | Multi-select      |
| `disabled`    | `boolean`        | `false` | Disable select    |

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

#### Props

| Prop            | Type      | Default | Description         |
| --------------- | --------- | ------- | ------------------- |
| `modelValue`    | `boolean` | `false` | Checked state       |
| `label`         | `string`  | -       | Label text          |
| `description`   | `string`  | -       | Description text    |
| `disabled`      | `boolean` | `false` | Disable checkbox    |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

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

#### Props

| Prop        | Type                                     | Default | Description     |
| ----------- | ---------------------------------------- | ------- | --------------- |
| `content`   | `string`                                 | -       | Tooltip text    |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position        |
| `delay`     | `number`                                 | `0`     | Show delay (ms) |

---

## 🎣 Composables

### useTheme

```ts
import { useTheme } from 'vuevuefafa'

const { mode, isDark, toggleMode, setMode, applyTheme } = useTheme()

toggleMode() // Toggle dark mode
setMode('dark') // 'light' | 'dark' | 'auto'
applyTheme({ primary: '#8b5cf6' })
```

### useToggle

```ts
import { useToggle } from 'vuevuefafa'

const [isOpen, toggle, setOpen] = useToggle(false)

toggle() // Toggle
setOpen(true) // Set value
```

### useFocusTrap

```ts
import { useFocusTrap } from 'vuevuefafa'

const containerRef = ref<HTMLElement>()
const { activate, deactivate } = useFocusTrap(containerRef)
```

### useFetch

```ts
import { useFetch } from 'vuevuefafa'

const { data, loading, error, execute } = useFetch<User[]>('/api/users')
```

### useId

```ts
import { useId } from 'vuevuefafa'

const { id, generateId } = useId({ prefix: 'modal' })
```

---

## 🎨 Theming

### CSS Variables

```css
:root {
  --vvv-primary-500: #8b5cf6;
  --vvv-primary-600: #7c3aed;
  --vvv-radius-lg: 0.75rem;
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

```vue
<script setup>
import { useTheme } from 'vuevuefafa'
const { isDark, toggleMode } = useTheme()
</script>

<template>
  <div :class="{ 'vvv-dark': isDark }">
    <VButton @click="toggleMode">Toggle Theme</VButton>
  </div>
</template>
```

---

## ♿ Accessibility

Semua komponen mengikuti **WCAG 2.1 Level AA**:

- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

---

## 🔷 TypeScript

```ts
import type { VButtonProps, VInputProps, VModalProps, VSelectProps, SelectOption } from 'vuevuefafa'
```

---

## 📄 License

[MIT](./LICENSE) © 2026 Ridho Bintang Aulia

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/Rbin01yuh">Ridho Bintang Aulia</a></sub>
</div>
