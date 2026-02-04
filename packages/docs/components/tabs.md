# Tabs

Komponen `VTabs` untuk mengorganisir konten dalam tab yang dapat diakses.

## Penggunaan Dasar

```vue
<template>
  <VTabs v-model="activeTab">
    <VTabList>
      <VTab value="account">Akun</VTab>
      <VTab value="security">Keamanan</VTab>
      <VTab value="notifications">Notifikasi</VTab>
    </VTabList>

    <VTabPanels>
      <VTabPanel value="account">
        <p>Pengaturan akun Anda...</p>
      </VTabPanel>
      <VTabPanel value="security">
        <p>Pengaturan keamanan...</p>
      </VTabPanel>
      <VTabPanel value="notifications">
        <p>Preferensi notifikasi...</p>
      </VTabPanel>
    </VTabPanels>
  </VTabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('account')
</script>
```

## Disabled Tab

```vue
<template>
  <VTabs>
    <VTabList>
      <VTab value="active">Aktif</VTab>
      <VTab value="disabled" disabled>Tidak Tersedia</VTab>
      <VTab value="another">Lainnya</VTab>
    </VTabList>
    <!-- ... -->
  </VTabs>
</template>
```

## Lazy Loading

Load konten tab hanya saat pertama kali diakses:

```vue
<template>
  <VTabs lazy>
    <VTabList>
      <VTab value="tab1">Tab 1</VTab>
      <VTab value="tab2">Tab 2 (Heavy)</VTab>
    </VTabList>

    <VTabPanels>
      <VTabPanel value="tab1">Loaded immediately</VTabPanel>
      <VTabPanel value="tab2">
        <HeavyComponent />
      </VTabPanel>
    </VTabPanels>
  </VTabs>
</template>
```

## API Reference

### VTabs Props

| Prop           | Type                         | Default        | Deskripsi        |
| -------------- | ---------------------------- | -------------- | ---------------- |
| `modelValue`   | `string \| number`           | -              | Tab aktif        |
| `defaultValue` | `string \| number`           | -              | Default tab      |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientasi        |
| `lazy`         | `boolean`                    | `false`        | Lazy load panels |

### VTab Props

| Prop       | Type               | Default  | Deskripsi   |
| ---------- | ------------------ | -------- | ----------- |
| `value`    | `string \| number` | Required | ID tab      |
| `disabled` | `boolean`          | `false`  | Nonaktifkan |

### VTabPanel Props

| Prop    | Type               | Default  | Deskripsi |
| ------- | ------------------ | -------- | --------- |
| `value` | `string \| number` | Required | ID panel  |

## Aksesibilitas

- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected` untuk tab aktif
- Arrow keys untuk navigasi
- Home/End untuk jump
