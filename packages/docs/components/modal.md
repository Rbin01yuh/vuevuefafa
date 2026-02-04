# Modal

Komponen `VModal` adalah dialog yang aksesibel dengan focus trap, keyboard navigation, dan berbagai konfigurasi.

## Penggunaan Dasar

```vue
<template>
  <VButton @click="isOpen = true">Buka Modal</VButton>

  <VModal v-model="isOpen" title="Judul Modal">
    <p>Ini adalah konten modal.</p>
  </VModal>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
```

## Dengan Footer

Tambahkan tombol aksi di footer:

```vue
<template>
  <VModal v-model="isOpen" title="Konfirmasi">
    <p>Apakah Anda yakin ingin melanjutkan?</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <VButton variant="outline" @click="isOpen = false"> Batal </VButton>
        <VButton @click="handleConfirm"> Konfirmasi </VButton>
      </div>
    </template>
  </VModal>
</template>
```

## Ukuran

Modal tersedia dalam berbagai ukuran:

```vue
<template>
  <VModal v-model="isOpen" size="sm" title="Small Modal">
    <p>Modal kecil untuk konten singkat.</p>
  </VModal>

  <VModal v-model="isOpen" size="lg" title="Large Modal">
    <p>Modal besar untuk konten yang lebih panjang.</p>
  </VModal>
</template>
```

## Persistent Modal

Cegah penutupan dengan klik backdrop atau Escape:

```vue
<template>
  <VModal v-model="isOpen" title="Form Penting" :close-on-backdrop="false" :close-on-esc="false">
    <p>Modal ini hanya bisa ditutup dengan tombol.</p>

    <template #footer>
      <VButton @click="isOpen = false">Tutup</VButton>
    </template>
  </VModal>
</template>
```

## Tanpa Tombol Close

Sembunyikan tombol X:

```vue
<template>
  <VModal v-model="isOpen" title="Custom Header" :show-close="false">
    <p>Modal tanpa tombol close default.</p>
  </VModal>
</template>
```

## Custom Header

Gunakan slot header untuk kustomisasi penuh:

```vue
<template>
  <VModal v-model="isOpen">
    <template #header>
      <div class="flex items-center gap-3">
        <Avatar :src="user.avatar" />
        <div>
          <h3 class="font-semibold">{{ user.name }}</h3>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
      </div>
    </template>

    <p>Detail profil pengguna...</p>
  </VModal>
</template>
```

## API Reference

### Props

| Prop              | Type                                     | Default  | Deskripsi                    |
| ----------------- | ---------------------------------------- | -------- | ---------------------------- |
| `modelValue`      | `boolean`                                | `false`  | Kontrol buka/tutup (v-model) |
| `title`           | `string`                                 | -        | Judul modal                  |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   | Ukuran modal                 |
| `closeOnBackdrop` | `boolean`                                | `true`   | Tutup saat klik backdrop     |
| `closeOnEsc`      | `boolean`                                | `true`   | Tutup saat tekan Escape      |
| `showClose`       | `boolean`                                | `true`   | Tampilkan tombol close       |
| `lockScroll`      | `boolean`                                | `true`   | Kunci scroll body            |
| `teleportTo`      | `string`                                 | `'body'` | Target teleport              |

### Slots

| Slot      | Deskripsi                |
| --------- | ------------------------ |
| `default` | Konten body modal        |
| `header`  | Kustomisasi header       |
| `footer`  | Area footer untuk tombol |

### Events

| Event               | Payload   | Deskripsi              |
| ------------------- | --------- | ---------------------- |
| `update:modelValue` | `boolean` | State berubah          |
| `open`              | -         | Modal dibuka           |
| `close`             | -         | Modal ditutup          |
| `after-enter`       | -         | Animasi masuk selesai  |
| `after-leave`       | -         | Animasi keluar selesai |

## Aksesibilitas

VModal mengimplementasikan praktik aksesibilitas terbaik:

- `role="dialog"` dan `aria-modal="true"`
- `aria-labelledby` terhubung ke judul
- **Focus trap** - fokus terjebak dalam modal
- **Escape key** - menutup modal
- **Return focus** - fokus kembali ke trigger saat ditutup
- **Scroll lock** - mencegah scroll background
