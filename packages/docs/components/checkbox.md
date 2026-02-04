# Checkbox

Komponen `VCheckbox` adalah input checkbox yang aksesibel dengan dukungan indeterminate state.

## Penggunaan Dasar

```vue
<template>
  <VCheckbox v-model="accepted" label="Saya setuju dengan syarat dan ketentuan" />
</template>

<script setup>
import { ref } from 'vue'
const accepted = ref(false)
</script>
```

## Dengan Deskripsi

```vue
<template>
  <VCheckbox
    v-model="newsletter"
    label="Langganan Newsletter"
    description="Dapatkan update terbaru langsung di inbox Anda"
  />
</template>
```

## Indeterminate State

State "sebagian dipilih" untuk parent checkbox:

```vue
<template>
  <VCheckbox
    v-model="selectAll"
    :indeterminate="someSelected"
    label="Pilih Semua"
    @change="handleSelectAll"
  />

  <div class="ml-6 mt-2 space-y-2">
    <VCheckbox v-model="items.a" label="Item A" />
    <VCheckbox v-model="items.b" label="Item B" />
    <VCheckbox v-model="items.c" label="Item C" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref({ a: false, b: true, c: false })

const selectedCount = computed(() =>
  Object.values(items.value).filter(Boolean).length
)

const selectAll = computed(() => selectedCount.value === 3)
const someSelected = computed(() =>
  selectedCount.value > 0 && selectedCount.value < 3
)

const handleSelectAll = (checked: boolean) => {
  items.value = { a: checked, b: checked, c: checked }
}
</script>
```

## API Reference

### Props

| Prop            | Type      | Default | Deskripsi           |
| --------------- | --------- | ------- | ------------------- |
| `modelValue`    | `boolean` | `false` | Nilai checkbox      |
| `label`         | `string`  | -       | Label teks          |
| `description`   | `string`  | -       | Teks deskripsi      |
| `disabled`      | `boolean` | `false` | Nonaktifkan         |
| `indeterminate` | `boolean` | `false` | State indeterminate |
| `name`          | `string`  | -       | HTML name           |
| `value`         | `any`     | -       | Nilai untuk form    |

### Events

| Event               | Payload   | Deskripsi     |
| ------------------- | --------- | ------------- |
| `update:modelValue` | `boolean` | State berubah |
| `change`            | `boolean` | State berubah |
