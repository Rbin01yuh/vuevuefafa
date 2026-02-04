# Memulai dengan vuevuefafa

Panduan ini akan membantu Anda menginstal dan mulai menggunakan vuevuefafa dalam proyek Vue 3 Anda.

## Prasyarat

Sebelum menginstal vuevuefafa, pastikan Anda memiliki:

- **Node.js** versi 18 atau lebih tinggi
- **Vue 3.3** atau lebih tinggi
- Package manager: **npm**, **pnpm**, atau **yarn**

## Instalasi

### Menggunakan Package Manager

::: code-group

```bash [pnpm]
pnpm add vuevuefafa
```

```bash [npm]
npm install vuevuefafa
```

```bash [yarn]
yarn add vuevuefafa
```

:::

### Menggunakan CDN

Untuk penggunaan cepat atau prototyping, Anda dapat menggunakan CDN:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/vuevuefafa/dist/style.css" />
  </head>
  <body>
    <div id="app">
      <v-button variant="primary">Klik Saya!</v-button>
    </div>

    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/vuevuefafa"></script>
    <script>
      const { createApp } = Vue
      const { VueVueVafa } = VueVueVafa

      createApp({}).use(VueVueVafa).mount('#app')
    </script>
  </body>
</html>
```

## Penggunaan Dasar

### Plugin Installation (Recommended)

Cara termudah untuk menggunakan vuevuefafa adalah dengan menginstalnya sebagai Vue plugin:

```ts
// main.ts
import { createApp } from 'vue'
import { VueVueVafa } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'
import App from './App.vue'

const app = createApp(App)

// Install plugin dengan opsi default
app.use(VueVueVafa)

// Atau dengan konfigurasi kustom
app.use(VueVueVafa, {
  // Kustomisasi prefix komponen (default: 'V')
  prefix: 'V',

  // Override warna tema
  theme: {
    primary: '#8b5cf6', // Purple
  },

  // Aktifkan dark mode secara default
  darkMode: false,
})

app.mount('#app')
```

Setelah plugin terinstal, semua komponen tersedia secara global:

```vue
<template>
  <div>
    <VButton variant="primary">Primary Button</VButton>
    <VInput v-model="name" label="Nama Anda" />
    <VCard>
      <p>Konten kartu</p>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
</script>
```

### Import Individual (Tree-Shaking)

Untuk bundle size yang lebih kecil, Anda dapat mengimport komponen secara individual:

```vue
<template>
  <VButton @click="handleClick">Klik Saya</VButton>
</template>

<script setup lang="ts">
import { VButton } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css' // Import styles once in your entry file

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

Metode ini memungkinkan bundler untuk tree-shake komponen yang tidak digunakan, menghasilkan bundle yang lebih kecil.

## Menggunakan Composables

vuevuefafa juga menyediakan composables yang berguna:

```ts
import { useToggle, useTheme, useFetch } from 'vuevuefafa'

// Toggle state management
const { value: isOpen, toggle, setTrue, setFalse } = useToggle()

// Theme management with dark mode
const { mode, isDark, toggleMode, applyTheme } = useTheme()

// Type-safe data fetching
const { data, error, isLoading, execute } = useFetch<User[]>('/api/users')
```

## Kustomisasi Tema

vuevuefafa menggunakan CSS Variables untuk theming, memungkinkan kustomisasi runtime:

```css
/* Override variabel di CSS Anda */
:root {
  --vvv-primary-500: #8b5cf6;
  --vvv-primary-600: #7c3aed;
  --vvv-radius-lg: 1rem;
}
```

Atau gunakan JavaScript:

```ts
import { useTheme } from 'vuevuefafa'

const { applyTheme } = useTheme()

// Terapkan tema kustom
applyTheme({
  primary: '#8b5cf6',
})
```

## Dark Mode

Aktifkan dark mode dengan menambahkan class `vvv-dark` ke elemen root:

```vue
<script setup>
import { useTheme } from 'vuevuefafa'

const { mode, toggleMode, isDark } = useTheme()
</script>

<template>
  <div :class="{ 'vvv-dark': isDark }">
    <button @click="toggleMode">
      {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </div>
</template>
```

## TypeScript Support

vuevuefafa sepenuhnya ditulis dalam TypeScript dan menyediakan type definitions lengkap:

```ts
import type { ButtonVariant, VButtonProps } from 'vuevuefafa'

const variant: ButtonVariant = 'primary'

const buttonProps: VButtonProps = {
  variant: 'outline',
  size: 'lg',
  disabled: false,
}
```

## Langkah Selanjutnya

- Pelajari [Arsitektur](/architecture) untuk memahami struktur library
- Jelajahi dokumentasi [Komponen](/components/button) untuk melihat semua fitur
- Baca panduan [Design Tokens](/design-tokens) untuk kustomisasi mendalam
- Pelajari standar [Aksesibilitas](/accessibility) yang kami gunakan
