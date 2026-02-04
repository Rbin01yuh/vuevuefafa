# Card

Komponen `VCard` adalah container dengan styling yang konsisten untuk mengelompokkan konten terkait.

## Penggunaan Dasar

```vue
<template>
  <VCard>
    <h3>Judul Kartu</h3>
    <p>Konten kartu di sini.</p>
  </VCard>
</template>
```

## Dengan Header dan Footer

```vue
<template>
  <VCard>
    <template #header>
      <h3 class="font-semibold">Profil Pengguna</h3>
    </template>

    <p>Detail informasi pengguna...</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <VButton variant="outline" size="sm">Batal</VButton>
        <VButton size="sm">Simpan</VButton>
      </div>
    </template>
  </VCard>
</template>
```

## Shadow Variants

```vue
<template>
  <div class="grid grid-cols-5 gap-4">
    <VCard shadow="none">none</VCard>
    <VCard shadow="sm">sm</VCard>
    <VCard shadow="md">md</VCard>
    <VCard shadow="lg">lg</VCard>
    <VCard shadow="xl">xl</VCard>
  </div>
</template>
```

## Hoverable

Tambahkan efek hover untuk kartu interaktif:

```vue
<template>
  <VCard hoverable @click="handleClick">
    <h3>Klik kartu ini</h3>
    <p>Hover untuk melihat efek shadow.</p>
  </VCard>
</template>
```

## API Reference

### Props

| Prop        | Type                                     | Default | Deskripsi        |
| ----------- | ---------------------------------------- | ------- | ---------------- |
| `shadow`    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`  | Ukuran shadow    |
| `bordered`  | `boolean`                                | `true`  | Tampilkan border |
| `hoverable` | `boolean`                                | `false` | Efek hover       |
| `padded`    | `boolean`                                | `true`  | Padding internal |

### Slots

| Slot      | Deskripsi    |
| --------- | ------------ |
| `default` | Konten body  |
| `header`  | Header kartu |
| `footer`  | Footer kartu |
