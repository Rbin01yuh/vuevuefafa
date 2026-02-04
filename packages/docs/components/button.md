# Button

Komponen `VButton` adalah elemen interaktif dasar untuk memicu aksi. Mendukung berbagai variant, ukuran, dan state.

## Penggunaan Dasar

```vue
<template>
  <VButton>Klik Saya</VButton>
</template>
```

## Variants

VButton menyediakan 5 variant untuk berbagai konteks penggunaan:

```vue
<template>
  <div class="flex gap-2">
    <VButton variant="primary">Primary</VButton>
    <VButton variant="secondary">Secondary</VButton>
    <VButton variant="outline">Outline</VButton>
    <VButton variant="ghost">Ghost</VButton>
    <VButton variant="danger">Danger</VButton>
  </div>
</template>
```

| Variant     | Penggunaan                       |
| ----------- | -------------------------------- |
| `primary`   | Aksi utama, CTA                  |
| `secondary` | Aksi sekunder                    |
| `outline`   | Aksi tersier, less prominent     |
| `ghost`     | Aksi minimal, dalam context menu |
| `danger`    | Aksi destruktif seperti delete   |

## Ukuran

Tiga ukuran tersedia untuk berbagai konteks:

```vue
<template>
  <div class="flex items-center gap-2">
    <VButton size="sm">Small</VButton>
    <VButton size="md">Medium</VButton>
    <VButton size="lg">Large</VButton>
  </div>
</template>
```

## State: Loading

Tampilkan loading spinner saat proses berlangsung:

```vue
<template>
  <VButton :loading="isSubmitting">
    {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
  </VButton>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  await saveData()
  isSubmitting.value = false
}
</script>
```

## State: Disabled

```vue
<template>
  <VButton disabled>Tidak Dapat Diklik</VButton>
</template>
```

## Full Width

Buat button mengisi lebar container:

```vue
<template>
  <VButton block>Full Width Button</VButton>
</template>
```

## Dengan Icon

Gunakan slot `icon-left` dan `icon-right` untuk menambahkan icon:

```vue
<template>
  <div class="flex gap-2">
    <VButton>
      <template #icon-left>
        <PlusIcon class="w-4 h-4" />
      </template>
      Tambah Item
    </VButton>

    <VButton variant="outline">
      Selanjutnya
      <template #icon-right>
        <ArrowRightIcon class="w-4 h-4" />
      </template>
    </VButton>
  </div>
</template>
```

## API Reference

### Props

| Prop       | Type                                                           | Default     | Deskripsi                 |
| ---------- | -------------------------------------------------------------- | ----------- | ------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Gaya visual button        |
| `size`     | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Ukuran button             |
| `disabled` | `boolean`                                                      | `false`     | Nonaktifkan button        |
| `loading`  | `boolean`                                                      | `false`     | Tampilkan loading spinner |
| `type`     | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | HTML button type          |
| `block`    | `boolean`                                                      | `false`     | Full width button         |

### Slots

| Slot         | Deskripsi                  |
| ------------ | -------------------------- |
| `default`    | Konten button              |
| `icon-left`  | Icon di sebelah kiri teks  |
| `icon-right` | Icon di sebelah kanan teks |

### Events

| Event   | Payload      | Deskripsi                    |
| ------- | ------------ | ---------------------------- |
| `click` | `MouseEvent` | Dipanggil saat button diklik |

## Aksesibilitas

- Button menggunakan native `<button>` element
- `aria-disabled` ditambahkan saat disabled
- `aria-busy` ditambahkan saat loading
- Fokus visual terlihat jelas
- Dapat diaktifkan dengan Enter atau Space
