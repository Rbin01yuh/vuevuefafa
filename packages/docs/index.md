---
layout: home

hero:
  name: 'vuevuefafa'
  text: 'UI Kit Vue 3 yang Production-Ready'
  tagline: Komponen yang Aksesibel, Dapat Dikustomisasi, dan Siap Produksi untuk Aplikasi Vue Modern
  actions:
    - theme: brand
      text: Mulai Sekarang
      link: /getting-started
    - theme: alt
      text: Lihat di GitHub
      link: https://github.com/user/vuevuefafa

features:
  - icon: 🎨
    title: Design System Lengkap
    details: Dibangun dengan Design Tokens berbasis CSS Variables yang memungkinkan kustomisasi tema secara runtime tanpa rebuild.
  - icon: ♿
    title: Aksesibilitas-First
    details: Setiap komponen dirancang dengan standar WCAG 2.1, mendukung keyboard navigation, focus management, dan screen reader.
  - icon: 🌙
    title: Dark Mode Bawaan
    details: Mode gelap yang sudah terintegrasi dengan dukungan untuk preferensi sistem (prefers-color-scheme) atau kontrol manual.
  - icon: 📦
    title: Tree-Shakeable
    details: Import hanya komponen yang Anda butuhkan. Bundle size minimal berkat arsitektur modular dan ESM support.
  - icon: 🔷
    title: TypeScript Native
    details: Ditulis sepenuhnya dalam TypeScript dengan type definitions yang lengkap untuk developer experience terbaik.
  - icon: 🚀
    title: Siap Produksi
    details: Diuji dengan Vitest dan Playwright, didokumentasikan dengan Storybook, dan siap deploy ke npm.
---

## Apa itu vuevuefafa?

**vuevuefafa** adalah UI Kit komprehensif untuk Vue 3 yang dirancang dengan prinsip aksesibilitas, customizability, dan developer experience sebagai prioritas utama. Library ini menyediakan komponen-komponen UI yang siap pakai untuk membangun aplikasi web modern dengan cepat dan konsisten.

### Prinsip Desain

1. **Aksesibilitas sebagai Fondasi** - Bukan afterthought, tapi built-in dari awal
2. **Komposisi over Konfigurasi** - Komponen yang fleksibel dan dapat dikombinasikan
3. **Zero Configuration Theme** - Bekerja out-of-the-box dengan opsi kustomisasi penuh
4. **Type-Safe** - TypeScript untuk autocomplete dan error detection

### Untuk Siapa vuevuefafa?

- **Startup** yang membutuhkan UI Kit cepat dan konsisten
- **Enterprise** yang memerlukan komponen accessible dan maintainable
- **Developer** yang ingin fokus pada logic aplikasi, bukan styling
- **Tim** yang membutuhkan design system yang terdokumentasi

## Quick Start

```bash
# Install dengan package manager favorit Anda
npm install vuevuefafa
# atau
pnpm add vuevuefafa
# atau
yarn add vuevuefafa
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
  <VButton variant="primary">Halo Dunia!</VButton>
</template>
```
