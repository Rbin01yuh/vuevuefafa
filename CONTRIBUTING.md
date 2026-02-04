# Contributing to vuevuefafa

Terima kasih atas minat Anda untuk berkontribusi pada vuevuefafa! 🎉

Panduan ini akan membantu Anda memahami cara terbaik untuk berkontribusi pada proyek ini.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [Reporting Bugs](#-reporting-bugs)
- [Feature Requests](#-feature-requests)
- [Community](#-community)

---

## 📜 Code of Conduct

Proyek ini mengadopsi standar komunitas open source yang inklusif. Kami berharap semua kontributor:

- **Bersikap ramah dan sabar**
- **Bersikap terbuka dan inklusif**
- **Menghormati perbedaan pendapat**
- **Menerima kritik konstruktif dengan baik**
- **Fokus pada apa yang terbaik untuk komunitas**

---

## 🚀 Getting Started

### Prerequisites

Pastikan Anda memiliki tools berikut terinstall:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended) atau npm/yarn
- **Git** >= 2.0.0

### Fork & Clone

1. **Fork** repository ini ke akun GitHub Anda
2. **Clone** fork Anda ke local machine:

```bash
git clone https://github.com/YOUR_USERNAME/vuevuefafa.git
cd vuevuefafa
```

3. **Tambahkan upstream remote**:

```bash
git remote add upstream https://github.com/Rbin01yuh/vuevuefafa.git
```

---

## 🛠️ Development Setup

### Install Dependencies

```bash
# Install pnpm jika belum ada
npm install -g pnpm

# Install project dependencies
pnpm install
```

### Build Library

```bash
# Build UI package
pnpm --filter vuevuefafa build
```

### Start Development

```bash
# Start Playground (recommended untuk development)
pnpm --filter @vuevuefafa/playground dev

# Start Storybook
pnpm --filter @vuevuefafa/storybook dev

# Start Documentation
pnpm --filter @vuevuefafa/docs dev
```

### Useful Commands

| Command                          | Description               |
| -------------------------------- | ------------------------- |
| `pnpm install`                   | Install all dependencies  |
| `pnpm build`                     | Build all packages        |
| `pnpm --filter vuevuefafa build` | Build UI library only     |
| `pnpm test:unit`                 | Run unit tests            |
| `pnpm test:e2e`                  | Run E2E tests             |
| `pnpm lint`                      | Run ESLint                |
| `pnpm format`                    | Format code with Prettier |

---

## 📁 Project Structure

```
vuevuefafa/
├── packages/
│   ├── ui/                    # Core UI library
│   │   ├── src/
│   │   │   ├── components/    # Vue components
│   │   │   ├── composables/   # Vue composables
│   │   │   ├── styles/        # CSS/design tokens
│   │   │   └── index.ts       # Main entry
│   │   ├── __tests__/         # Unit tests
│   │   └── package.json
│   ├── docs/                  # VitePress documentation
│   ├── storybook/             # Storybook stories
│   └── playground/            # Demo application
├── e2e/                       # Playwright E2E tests
├── .github/                   # GitHub Actions workflows
└── package.json               # Root package.json
```

---

## 💻 Development Workflow

### 1. Sync dengan Upstream

Sebelum mulai mengerjakan fitur baru:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Buat Branch Baru

```bash
# Untuk fitur baru
git checkout -b feat/nama-fitur

# Untuk bug fix
git checkout -b fix/nama-bug

# Untuk dokumentasi
git checkout -b docs/nama-docs
```

### 3. Develop & Test

```bash
# Start playground untuk development
pnpm --filter @vuevuefafa/playground dev

# Run tests
pnpm test:unit

# Lint code
pnpm lint
```

### 4. Commit & Push

```bash
git add .
git commit -m "feat: deskripsi perubahan"
git push origin feat/nama-fitur
```

### 5. Create Pull Request

Buka GitHub dan create Pull Request dari branch Anda ke `main`.

---

## 📝 Coding Standards

### Vue Components

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue'

// 2. Types/Interfaces
interface Props {
  label: string
  disabled?: boolean
}

// 3. Props with defaults
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// 4. Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 5. Refs & reactive
const isActive = ref(false)

// 6. Computed
const classes = computed(() => ({
  'is-active': isActive.value,
  'is-disabled': props.disabled,
}))

// 7. Methods
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <!-- Template dengan semantic HTML -->
</template>
```

### TypeScript

- Gunakan **strict mode**
- Definisikan **types/interfaces** untuk semua props
- Hindari `any`, gunakan `unknown` jika perlu
- Export types dari `index.ts`

### CSS/Styling

- Gunakan **Tailwind CSS** classes
- Gunakan **CSS Variables** untuk theming
- Prefix custom variables dengan `--vvv-`
- Support **dark mode** dengan `.vvv-dark`

### Accessibility

- Gunakan **semantic HTML** elements
- Tambahkan **ARIA attributes** yang sesuai
- Support **keyboard navigation**
- Test dengan **screen readers**

---

## 📌 Commit Guidelines

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                     |
| ---------- | ------------------------------- |
| `feat`     | Fitur baru                      |
| `fix`      | Bug fix                         |
| `docs`     | Dokumentasi                     |
| `style`    | Formatting (tanpa logic change) |
| `refactor` | Refactoring code                |
| `test`     | Menambah/mengubah tests         |
| `chore`    | Maintenance, dependencies       |
| `perf`     | Performance improvements        |
| `ci`       | CI/CD changes                   |

### Examples

```bash
# Fitur baru
git commit -m "feat(button): add icon slot support"

# Bug fix
git commit -m "fix(modal): resolve focus trap issue on close"

# Dokumentasi
git commit -m "docs(readme): update installation guide"

# Breaking change
git commit -m "feat(select)!: change options prop structure

BREAKING CHANGE: options now require 'value' and 'label' keys"
```

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code mengikuti coding standards
- [ ] Semua tests pass (`pnpm test:unit`)
- [ ] Tidak ada lint errors (`pnpm lint`)
- [ ] Dokumentasi diupdate jika perlu
- [ ] Commits mengikuti conventional commits

### PR Template

```markdown
## Description

[Deskripsi perubahan]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing done

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. Maintainer akan review PR Anda
2. Jika ada feedback, perbaiki dan push lagi
3. Setelah approved, PR akan di-merge

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test:unit

# Run with coverage
pnpm test:unit -- --coverage

# Watch mode
pnpm test:unit -- --watch
```

#### Writing Unit Tests

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VButton } from '../src/components/VButton'

describe('VButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(VButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(VButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
pnpm test:e2e

# UI mode
pnpm test:e2e -- --ui

# Headed mode
pnpm test:e2e -- --headed
```

---

## 📖 Documentation

Dokumentasi menggunakan **VitePress** dengan bahasa Indonesia.

### Adding Component Docs

1. Buat file di `packages/docs/components/{nama}.md`
2. Ikuti format existing docs
3. Include:
   - Penggunaan dasar
   - Semua props dengan contoh
   - API reference table
   - Accessibility notes

### Preview Docs

```bash
pnpm --filter @vuevuefafa/docs dev
```

---

## 🐛 Reporting Bugs

### Before Reporting

1. Search existing issues untuk memastikan bug belum dilaporkan
2. Update ke versi terbaru dan cek apakah bug masih ada
3. Siapkan minimal reproduction

### Bug Report Template

```markdown
## Bug Description

[Deskripsi singkat bug]

## Steps to Reproduce

1. Step 1
2. Step 2
3. ...

## Expected Behavior

[Apa yang seharusnya terjadi]

## Actual Behavior

[Apa yang terjadi]

## Environment

- vuevuefafa version: x.x.x
- Vue version: x.x.x
- Browser: Chrome/Firefox/Safari
- OS: Windows/macOS/Linux

## Minimal Reproduction

[Link ke CodeSandbox/StackBlitz atau code snippet]
```

---

## 💡 Feature Requests

### Before Requesting

1. Check roadmap dan existing issues
2. Pertimbangkan apakah fitur sesuai dengan scope library

### Feature Request Template

```markdown
## Feature Description

[Deskripsi fitur yang diinginkan]

## Use Case

[Mengapa fitur ini berguna?]

## Proposed API

[Contoh bagaimana fitur akan digunakan]

## Alternatives Considered

[Alternatif lain yang sudah dipertimbangkan]
```

---

## 👥 Community

### Getting Help

- 📝 **GitHub Issues** - Bug reports & feature requests
- 💬 **GitHub Discussions** - Questions & general discussion

### Recognition

Semua kontributor akan dicantumkan di:

- README.md Contributors section
- GitHub Contributors page

---

## 📄 License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">
  <sub>Made with ❤️ by the vuevuefafa community</sub>
  <br>
  <sub>Maintained by <a href="https://github.com/Rbin01yuh">Ridho Bintang Aulia</a></sub>
</div>
