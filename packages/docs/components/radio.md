# Radio

Komponen `VRadio` dan `VRadioGroup` untuk single-selection dari beberapa opsi.

## Penggunaan Dasar

```vue
<template>
  <VRadioGroup v-model="plan" label="Pilih Paket">
    <VRadio value="free" label="Gratis" />
    <VRadio value="pro" label="Pro" />
    <VRadio value="enterprise" label="Enterprise" />
  </VRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
const plan = ref('free')
</script>
```

## Dengan Deskripsi

```vue
<template>
  <VRadioGroup v-model="plan" label="Pilih Paket">
    <VRadio value="free" label="Gratis" description="Fitur dasar, cocok untuk personal" />
    <VRadio
      value="pro"
      label="Pro - Rp99.000/bulan"
      description="Fitur lengkap untuk profesional"
    />
    <VRadio value="enterprise" label="Enterprise" description="Kustom sesuai kebutuhan bisnis" />
  </VRadioGroup>
</template>
```

## Horizontal Layout

```vue
<template>
  <VRadioGroup v-model="size" label="Ukuran" orientation="horizontal">
    <VRadio value="s" label="S" />
    <VRadio value="m" label="M" />
    <VRadio value="l" label="L" />
    <VRadio value="xl" label="XL" />
  </VRadioGroup>
</template>
```

## API Reference

### VRadioGroup Props

| Prop          | Type                         | Default      | Deskripsi         |
| ------------- | ---------------------------- | ------------ | ----------------- |
| `modelValue`  | `any`                        | -            | Nilai terpilih    |
| `label`       | `string`                     | -            | Label group       |
| `disabled`    | `boolean`                    | `false`      | Nonaktifkan semua |
| `name`        | `string`                     | -            | HTML name         |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout            |

### VRadio Props

| Prop          | Type      | Default | Deskripsi      |
| ------------- | --------- | ------- | -------------- |
| `value`       | `any`     | -       | Nilai radio    |
| `label`       | `string`  | -       | Label teks     |
| `description` | `string`  | -       | Teks deskripsi |
| `disabled`    | `boolean` | `false` | Nonaktifkan    |
