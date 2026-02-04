# Design Tokens & Theming

vuevuefafa menggunakan Design Tokens berbasis CSS Variables untuk theming yang fleksibel.

## CSS Variables

Semua design tokens didefinisikan sebagai CSS custom properties:

```css
:root {
  /* Warna Primer */
  --vvv-primary-50: #eff6ff;
  --vvv-primary-500: #3b82f6;
  --vvv-primary-600: #2563eb;

  /* Warna Netral */
  --vvv-neutral-50: #fafafa;
  --vvv-neutral-500: #71717a;
  --vvv-neutral-900: #18181b;

  /* Typography */
  --vvv-font-sans: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --vvv-spacing-4: 1rem;

  /* Border Radius */
  --vvv-radius-lg: 0.5rem;

  /* Shadows */
  --vvv-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## Override via CSS

Override tokens di stylesheet Anda:

```css
:root {
  --vvv-primary-500: #8b5cf6;
  --vvv-primary-600: #7c3aed;
}
```

## Override via JavaScript

Gunakan `useTheme` untuk runtime theming:

```ts
import { useTheme } from 'vuevuefafa'

const { applyTheme } = useTheme()

applyTheme({
  primary: '#8b5cf6',
})
```

## Dark Mode

Aktifkan dark mode dengan class `vvv-dark`:

```vue
<div class="vvv-dark">
  <!-- Komponen akan menggunakan tema gelap -->
</div>
```

Atau gunakan composable:

```ts
import { useTheme } from 'vuevuefafa'

const { mode, toggleMode, isDark, setMode } = useTheme()

// Toggle mode
toggleMode()

// Set spesifik
setMode('dark')
setMode('light')
setMode('auto') // mengikuti sistem
```

## Auto Mode (System Preference)

Class `vvv-auto` akan mengikuti preferensi sistem:

```vue
<div :class="mode === 'auto' ? 'vvv-auto' : mode === 'dark' ? 'vvv-dark' : ''">
  <!-- Mengikuti prefers-color-scheme -->
</div>
```
