# vuevuefafa

[![npm version](https://img.shields.io/npm/v/vuevuefafa.svg)](https://www.npmjs.com/package/vuevuefafa)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/Rbin01yuh/vuevuefafa/actions/workflows/ci.yml/badge.svg)](https://github.com/Rbin01yuh/vuevuefafa/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.4-green.svg)](https://vuejs.org/)

<div align="center">
  <img src="https://img.shields.io/badge/vuevuefafa-Production%20Ready-blueviolet?style=for-the-badge" alt="Production Ready" />
</div>

---

**Production-ready Vue 3 UI Kit** dengan komponen yang aksesibel, dapat dikustomisasi, dan siap produksi.

> 🛠️ Created by **Ridho Bintang Aulia** | © 2026

## ✨ Features

- 🎨 **10 Komponen UI** - Button, Input, Modal, Card, Select, Checkbox, Radio, Tabs, Dropdown, Tooltip
- 🌙 **Dark Mode** - Dukungan bawaan dengan toggle manual atau auto
- ♿ **Aksesibilitas** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 📦 **Tree-Shakeable** - Import hanya yang dibutuhkan
- 🔷 **TypeScript** - Type definitions lengkap
- 🎯 **CSS Variables** - Runtime theming tanpa rebuild
- 📱 **Responsive** - Mobile-first design
- 🧪 **Tested** - Unit tests & E2E tests

## 📦 Installation

```bash
# npm
npm install vuevuefafa

# pnpm (recommended)
pnpm add vuevuefafa

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

## 📖 Documentation

Kunjungi [dokumentasi lengkap](https://rbin01yuh.github.io/vuevuefafa) untuk panduan penggunaan.

## 🧩 Components

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

## 📁 Project Structure

```
vuevuefafa/
├── packages/
│   ├── ui/           # Core library
│   ├── docs/         # VitePress documentation
│   ├── storybook/    # Component stories
│   └── playground/   # Demo app
├── e2e/              # E2E tests
└── .github/          # CI/CD workflows
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 👨‍💻 Author

**Ridho Bintang Aulia**

- GitHub: [@Rbin01yuh](https://github.com/Rbin01yuh)

## 📄 License

[MIT](LICENSE) © 2026 Ridho Bintang Aulia

---

<div align="center">
  <sub>Built with ❤️ by Ridho Bintang Aulia</sub>
</div>
