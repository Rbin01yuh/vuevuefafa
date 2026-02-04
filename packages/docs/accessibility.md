# Aksesibilitas

vuevuefafa dibangun dengan aksesibilitas sebagai prioritas utama, mengikuti standar WCAG 2.1 Level AA.

## Prinsip Aksesibilitas

### 1. Keyboard Navigation

Semua komponen interaktif dapat dioperasikan dengan keyboard:

- **Tab** - Navigasi antar elemen
- **Enter/Space** - Aktivasi
- **Arrow keys** - Navigasi dalam komponen
- **Escape** - Menutup popup/modal

### 2. ARIA Attributes

Semua komponen memiliki ARIA attributes yang sesuai:

```vue
<!-- VButton -->
<button aria-disabled="true" aria-busy="false">

<!-- VModal -->
<div role="dialog" aria-modal="true" aria-labelledby="title-id">

<!-- VInput -->
<input aria-invalid="true" aria-describedby="error-id" aria-required="true">
```

### 3. Focus Management

- Focus trap di modal dan dropdown
- Visible focus indicators
- Logical focus order
- Return focus setelah interaksi

### 4. Screen Reader Support

- Meaningful labels
- Status announcements
- Error alerts
- Hidden decorative elements

## Testing Aksesibilitas

Kami menggunakan axe-core untuk automated testing:

```ts
import AxeBuilder from '@axe-core/playwright'

test('button is accessible', async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

## Checklist Komponen

| Komponen  | Keyboard | ARIA | Focus | Screen Reader |
| --------- | -------- | ---- | ----- | ------------- |
| VButton   | ✅       | ✅   | ✅    | ✅            |
| VInput    | ✅       | ✅   | ✅    | ✅            |
| VModal    | ✅       | ✅   | ✅    | ✅            |
| VSelect   | ✅       | ✅   | ✅    | ✅            |
| VTabs     | ✅       | ✅   | ✅    | ✅            |
| VDropdown | ✅       | ✅   | ✅    | ✅            |
