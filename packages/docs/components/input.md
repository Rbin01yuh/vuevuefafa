# Input

Komponen `VInput` adalah text input yang aksesibel dengan dukungan label, validasi, dan berbagai fitur.

## Penggunaan Dasar

```vue
<template>
  <VInput v-model="name" placeholder="Masukkan nama Anda" />
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
</script>
```

## Dengan Label

Selalu gunakan label untuk aksesibilitas yang baik:

```vue
<template>
  <VInput v-model="email" label="Alamat Email" type="email" placeholder="anda@contoh.com" />
</template>
```

## Required Field

Tampilkan indikator required:

```vue
<template>
  <VInput v-model="name" label="Nama Lengkap" required />
</template>
```

## Error State

Tampilkan pesan error untuk validasi:

```vue
<template>
  <VInput v-model="email" label="Email" :error="emailError" />
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const emailError = computed(() => {
  if (!email.value) return 'Email wajib diisi'
  if (!email.value.includes('@')) return 'Format email tidak valid'
  return ''
})
</script>
```

## Helper Text

Tambahkan teks bantuan di bawah input:

```vue
<template>
  <VInput
    v-model="password"
    label="Password"
    type="password"
    helper-text="Minimal 8 karakter dengan huruf dan angka"
  />
</template>
```

## Clearable

Tambahkan tombol clear:

```vue
<template>
  <VInput v-model="search" label="Pencarian" placeholder="Cari..." clearable />
</template>
```

## Prefix dan Suffix

Tambahkan elemen di dalam input:

```vue
<template>
  <VInput v-model="price" label="Harga">
    <template #prefix>Rp</template>
  </VInput>

  <VInput v-model="weight" label="Berat">
    <template #suffix>kg</template>
  </VInput>

  <VInput v-model="website" label="Website">
    <template #prefix>https://</template>
    <template #suffix>.com</template>
  </VInput>
</template>
```

## Ukuran

```vue
<template>
  <div class="space-y-4">
    <VInput v-model="sm" size="sm" placeholder="Small" />
    <VInput v-model="md" size="md" placeholder="Medium" />
    <VInput v-model="lg" size="lg" placeholder="Large" />
  </div>
</template>
```

## Input Types

VInput mendukung berbagai tipe input HTML:

```vue
<template>
  <VInput v-model="text" type="text" label="Teks" />
  <VInput v-model="email" type="email" label="Email" />
  <VInput v-model="password" type="password" label="Password" />
  <VInput v-model="number" type="number" label="Angka" />
  <VInput v-model="tel" type="tel" label="Telepon" />
  <VInput v-model="url" type="url" label="URL" />
  <VInput v-model="search" type="search" label="Pencarian" />
</template>
```

## API Reference

### Props

| Prop           | Type                                                                        | Default  | Deskripsi               |
| -------------- | --------------------------------------------------------------------------- | -------- | ----------------------- |
| `modelValue`   | `string \| number`                                                          | `''`     | Nilai input (v-model)   |
| `type`         | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Tipe input HTML         |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`   | Ukuran input            |
| `label`        | `string`                                                                    | -        | Label teks              |
| `placeholder`  | `string`                                                                    | -        | Placeholder teks        |
| `helperText`   | `string`                                                                    | -        | Teks bantuan            |
| `error`        | `string`                                                                    | -        | Pesan error             |
| `disabled`     | `boolean`                                                                   | `false`  | Nonaktifkan input       |
| `required`     | `boolean`                                                                   | `false`  | Tandai sebagai required |
| `readonly`     | `boolean`                                                                   | `false`  | Jadikan readonly        |
| `clearable`    | `boolean`                                                                   | `false`  | Tampilkan tombol clear  |
| `name`         | `string`                                                                    | -        | HTML name attribute     |
| `autocomplete` | `string`                                                                    | -        | Autocomplete attribute  |
| `maxlength`    | `number`                                                                    | -        | Maksimum karakter       |

### Slots

| Slot     | Deskripsi                     |
| -------- | ----------------------------- |
| `prefix` | Konten di sebelah kiri input  |
| `suffix` | Konten di sebelah kanan input |

### Events

| Event               | Payload            | Deskripsi              |
| ------------------- | ------------------ | ---------------------- |
| `update:modelValue` | `string \| number` | Nilai input berubah    |
| `focus`             | `FocusEvent`       | Input mendapat fokus   |
| `blur`              | `FocusEvent`       | Input kehilangan fokus |
| `clear`             | -                  | Tombol clear diklik    |

### Exposed Methods

Akses methods melalui template ref:

```vue
<template>
  <VInput ref="inputRef" v-model="value" />
  <VButton @click="inputRef?.focus()">Fokus Input</VButton>
</template>

<script setup>
import { ref } from 'vue'

const inputRef = ref()
const value = ref('')
</script>
```

| Method    | Deskripsi                  |
| --------- | -------------------------- |
| `focus()` | Fokuskan input             |
| `blur()`  | Hilangkan fokus dari input |

## Aksesibilitas

- Label terhubung ke input via `for`/`id`
- `aria-invalid` saat ada error
- `aria-describedby` untuk helper text dan error
- `aria-required` untuk field wajib
- Error message memiliki `role="alert"`
