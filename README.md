# vuevuefafa

[![npm version](https://img.shields.io/npm/v/vuevuefafa.svg)](https://www.npmjs.com/package/vuevuefafa)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/Rbin01yuh/vuevuefafa/actions/workflows/ci.yml/badge.svg)](https://github.com/Rbin01yuh/vuevuefafa/actions/workflows/ci.yml)

Production-ready Vue 3 UI Kit dengan komponen yang aksesibel, dapat dikustomisasi, dan siap produksi.

## ✨ Fitur

- 🎨 **10 Komponen UI** - Button, Input, Modal, Card, Select, Checkbox, Radio, Tabs, Dropdown, Tooltip
- 🌙 **Dark Mode** - Dukungan bawaan dengan toggle manual atau auto
- ♿ **Aksesibilitas** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 📦 **Tree-Shakeable** - Import hanya yang dibutuhkan
- 🔷 **TypeScript** - Type definitions lengkap
- 🎯 **CSS Variables** - Runtime theming tanpa rebuild
- 📱 **Responsive** - Mobile-first design

## 📦 Instalasi

```bash
# pnpm (recommended)
pnpm add vuevuefafa

# npm
npm install vuevuefafa

# yarn
yarn add vuevuefafa
```

## 🚀 Quick Start

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
  <VButton variant="primary">Halo Dunia!</VButton>
</template>
```

## 📖 Dokumentasi

Kunjungi [dokumentasi lengkap](https://user.github.io/vuevuefafa) untuk panduan penggunaan.

## 🧩 Komponen

| Komponen    | Deskripsi                                    |
| ----------- | -------------------------------------------- |
| `VButton`   | Button dengan variants, sizes, loading state |
| `VInput`    | Text input dengan label, error, clearable    |
| `VModal`    | Dialog dengan focus trap, keyboard support   |
| `VCard`     | Container dengan header/footer slots         |
| `VSelect`   | Dropdown select dengan search, multi-select  |
| `VCheckbox` | Checkbox dengan indeterminate state          |
| `VRadio`    | Radio button dengan VRadioGroup              |
| `VTabs`     | Tab navigation dengan lazy loading           |
| `VDropdown` | Menu dropdown dengan keyboard nav            |
| `VTooltip`  | Tooltip dengan placement options             |

## 🎨 Theming

Override CSS variables untuk kustomisasi:

```css
:root {
  --vvv-primary-500: #8b5cf6;
  --vvv-primary-600: #7c3aed;
}
```

Atau gunakan JavaScript:

```ts
import { useTheme } from 'vuevuefafa'

const { applyTheme, toggleMode } = useTheme()

applyTheme({ primary: '#8b5cf6' })
toggleMode() // Toggle dark mode
```

## 🛠️ Development

```bash
# Clone
git clone https://github.com/Rbin01yuh/vuevuefafa.git
cd vuevuefafa

# Install
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Test
pnpm test:unit
pnpm test:e2e
```

## 📄 License

[MIT](LICENSE) © 2024 vuevuefafa
