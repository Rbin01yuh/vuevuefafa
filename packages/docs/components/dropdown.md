# Dropdown

Komponen `VDropdown` untuk menu popup dengan keyboard navigation.

## Penggunaan Dasar

```vue
<template>
  <VDropdown>
    <template #trigger="{ isOpen }">
      <VButton variant="outline"> Menu {{ isOpen ? '▲' : '▼' }} </VButton>
    </template>

    <VDropdownItem @click="handleProfile">Profil</VDropdownItem>
    <VDropdownItem @click="handleSettings">Pengaturan</VDropdownItem>
    <VDropdownItem @click="handleHelp">Bantuan</VDropdownItem>
    <VDropdownItem destructive @click="handleLogout">Keluar</VDropdownItem>
  </VDropdown>
</template>
```

## Placement

```vue
<template>
  <VDropdown placement="bottom-start"><!-- Default --></VDropdown>
  <VDropdown placement="bottom-end"></VDropdown>
  <VDropdown placement="top-start"></VDropdown>
  <VDropdown placement="top-end"></VDropdown>
</template>
```

## Disabled Items

```vue
<template>
  <VDropdown>
    <template #trigger>
      <VButton>Aksi</VButton>
    </template>

    <VDropdownItem>Edit</VDropdownItem>
    <VDropdownItem disabled>Pindahkan (tidak tersedia)</VDropdownItem>
    <VDropdownItem destructive>Hapus</VDropdownItem>
  </VDropdown>
</template>
```

## API Reference

### VDropdown Props

| Prop                  | Type                                                         | Default          | Deskripsi            |
| --------------------- | ------------------------------------------------------------ | ---------------- | -------------------- |
| `placement`           | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Posisi menu          |
| `closeOnSelect`       | `boolean`                                                    | `true`           | Tutup setelah pilih  |
| `closeOnClickOutside` | `boolean`                                                    | `true`           | Tutup saat klik luar |
| `disabled`            | `boolean`                                                    | `false`          | Nonaktifkan          |

### VDropdownItem Props

| Prop          | Type      | Default | Deskripsi        |
| ------------- | --------- | ------- | ---------------- |
| `disabled`    | `boolean` | `false` | Nonaktifkan item |
| `destructive` | `boolean` | `false` | Gaya destruktif  |

### Keyboard Navigation

- `Enter` / `Space` - Buka menu atau pilih item
- `Arrow Down` - Item berikutnya
- `Arrow Up` - Item sebelumnya
- `Home` - Item pertama
- `End` - Item terakhir
- `Escape` - Tutup menu
