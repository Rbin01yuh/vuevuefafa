# Tooltip

Komponen `VTooltip` untuk menampilkan informasi tambahan saat hover.

## Penggunaan Dasar

```vue
<template>
  <VTooltip content="Ini adalah tooltip">
    <VButton>Hover me</VButton>
  </VTooltip>
</template>
```

## Placement

```vue
<template>
  <VTooltip content="Atas" placement="top">
    <VButton>Top</VButton>
  </VTooltip>

  <VTooltip content="Bawah" placement="bottom">
    <VButton>Bottom</VButton>
  </VTooltip>

  <VTooltip content="Kiri" placement="left">
    <VButton>Left</VButton>
  </VTooltip>

  <VTooltip content="Kanan" placement="right">
    <VButton>Right</VButton>
  </VTooltip>
</template>
```

## Delay

```vue
<template>
  <VTooltip content="Muncul setelah 500ms" :delay="500">
    <span>Hover dengan delay</span>
  </VTooltip>
</template>
```

## API Reference

### Props

| Prop        | Type                                     | Default  | Deskripsi         |
| ----------- | ---------------------------------------- | -------- | ----------------- |
| `content`   | `string`                                 | Required | Konten tooltip    |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`  | Posisi            |
| `delay`     | `number`                                 | `0`      | Delay tampil (ms) |
| `arrow`     | `boolean`                                | `true`   | Tampilkan panah   |
| `disabled`  | `boolean`                                | `false`  | Nonaktifkan       |
