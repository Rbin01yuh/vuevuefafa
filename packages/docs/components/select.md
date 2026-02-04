# Select

Komponen `VSelect` adalah dropdown select dengan dukungan single/multi select, pencarian, dan async options.

## Penggunaan Dasar

```vue
<template>
  <VSelect v-model="country" :options="countries" label="Negara" placeholder="Pilih negara" />
</template>

<script setup>
import { ref } from 'vue'

const country = ref('')
const countries = [
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
]
</script>
```

## Searchable

Aktifkan pencarian dalam options:

```vue
<template>
  <VSelect v-model="city" :options="cities" label="Kota" searchable />
</template>
```

## Multi Select

Pilih beberapa opsi sekaligus:

```vue
<template>
  <VSelect v-model="tags" :options="tagOptions" label="Tags" multiple placeholder="Pilih tags..." />
</template>

<script setup>
import { ref } from 'vue'

const tags = ref<string[]>([])
const tagOptions = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
]
</script>
```

## Async Options

Load options dari API:

```vue
<template>
  <VSelect v-model="user" :load-options="searchUsers" label="Cari Pengguna" searchable />
</template>

<script setup>
import { ref } from 'vue'

const user = ref('')

const searchUsers = async (query: string) => {
  const response = await fetch(`/api/users?q=${query}`)
  return response.json()
}
</script>
```

## Clearable

Tambahkan tombol clear:

```vue
<template>
  <VSelect v-model="value" :options="options" clearable />
</template>
```

## API Reference

### Props

| Prop          | Type                        | Default              | Deskripsi          |
| ------------- | --------------------------- | -------------------- | ------------------ |
| `modelValue`  | `string \| number \| Array` | -                    | Nilai terpilih     |
| `options`     | `SelectOption[]`            | `[]`                 | Daftar opsi        |
| `placeholder` | `string`                    | `'Select an option'` | Placeholder        |
| `label`       | `string`                    | -                    | Label              |
| `error`       | `string`                    | -                    | Pesan error        |
| `helperText`  | `string`                    | -                    | Teks bantuan       |
| `disabled`    | `boolean`                   | `false`              | Nonaktifkan        |
| `required`    | `boolean`                   | `false`              | Wajib diisi        |
| `multiple`    | `boolean`                   | `false`              | Multi select       |
| `searchable`  | `boolean`                   | `false`              | Aktifkan pencarian |
| `loadOptions` | `Function`                  | -                    | Async loader       |
| `clearable`   | `boolean`                   | `false`              | Tombol clear       |

### Events

| Event               | Payload  | Deskripsi        |
| ------------------- | -------- | ---------------- |
| `update:modelValue` | `any`    | Nilai berubah    |
| `change`            | `any`    | Nilai berubah    |
| `search`            | `string` | Query pencarian  |
| `open`              | -        | Dropdown dibuka  |
| `close`             | -        | Dropdown ditutup |
