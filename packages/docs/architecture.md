# Arsitektur vuevuefafa

Halaman ini menjelaskan keputusan arsitektur di balik vuevuefafa dan mengapa kami memilih teknologi yang kami gunakan.

## Mengapa Vue 3 Composition API?

vuevuefafa dibangun sepenuhnya dengan Vue 3 Composition API karena beberapa alasan:

### 1. Type Safety yang Lebih Baik

Composition API bekerja sangat baik dengan TypeScript, memungkinkan kami menyediakan type inference yang akurat untuk semua props, emits, dan slots:

```ts
// Props dengan type yang jelas
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
  }
)

// Emits dengan type
const emit = defineEmits<{
  click: [event: MouseEvent]
  change: [value: string]
}>()
```

### 2. Reusable Logic dengan Composables

Composables memungkinkan kami mengekstrak dan membagikan logic antar komponen:

```ts
// useFocusTrap.ts - digunakan di VModal dan VDropdown
export function useFocusTrap(container: Ref<HTMLElement | null>) {
  // Logic manajemen fokus
  return { activate, deactivate, isActive }
}
```

### 3. Tree-Shaking Optimal

Dengan Composition API, setiap komponen dan composable dapat di-tree-shake secara independen, menghasilkan bundle size yang minimal.

## Struktur Monorepo

vuevuefafa menggunakan pnpm workspace untuk mengelola monorepo:

```
vuevuefafa/
├── packages/
│   ├── ui/           # Core UI library (published to npm)
│   ├── docs/         # VitePress documentation
│   ├── storybook/    # Component stories
│   └── playground/   # Demo application
├── e2e/              # Playwright E2E tests
└── .github/          # CI/CD workflows
```

### Keuntungan Monorepo

1. **Shared Dependencies** - Satu versi Vue dan dependencies lainnya
2. **Atomic Changes** - Perubahan di library dan docs dalam satu commit
3. **Consistent Build** - Build scripts yang sama untuk semua packages
4. **Easy Testing** - E2E tests yang mencakup seluruh ecosystem

## Build Pipeline

### Vite Library Mode

Kami menggunakan Vite dalam library mode untuk build yang optimal:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueVueVafa',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
```

### Output Files

Build menghasilkan file-file berikut:

| File                | Format | Penggunaan                           |
| ------------------- | ------ | ------------------------------------ |
| `vuevuefafa.es.js`  | ESM    | Bundler modern (Vite, webpack, etc.) |
| `vuevuefafa.umd.js` | UMD    | CDN, browser langsung                |
| `index.d.ts`        | Types  | TypeScript support                   |
| `style.css`         | CSS    | Styles (termasuk Tailwind)           |

## Package Exports

`package.json` menggunakan exports map untuk optimal resolution:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/vuevuefafa.es.js",
      "require": "./dist/vuevuefafa.umd.js"
    },
    "./styles": "./dist/style.css"
  }
}
```

## Design Tokens Architecture

### CSS Variables

Semua design tokens didefinisikan sebagai CSS Variables:

```css
:root {
  /* Colors */
  --vvv-primary-500: #3b82f6;

  /* Spacing */
  --vvv-spacing-4: 1rem;

  /* Typography */
  --vvv-font-sans: Inter, system-ui, sans-serif;

  /* Shadows */
  --vvv-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### Tailwind Integration

Tailwind dikonfigurasi untuk menggunakan CSS Variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'var(--vvv-primary-500)',
          600: 'var(--vvv-primary-600)',
        },
      },
    },
  },
}
```

Ini memungkinkan:

- **Build-time optimization** dari Tailwind
- **Runtime customization** via CSS Variables
- **Dark mode** dengan class `.vvv-dark`

## Component API Design

### Props Pattern

Setiap komponen mengikuti pola yang konsisten:

```ts
export interface VComponentProps {
  // Required props tanpa default
  value: string

  // Optional props dengan default
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}
```

### Accessibility-First

Setiap komponen interactive menyertakan:

- **ARIA attributes** yang sesuai
- **Keyboard navigation** lengkap
- **Focus management** yang proper
- **Screen reader** announcements

```vue
<button
  :aria-disabled="disabled"
  :aria-pressed="pressed"
  @keydown.enter="handleActivate"
  @keydown.space.prevent="handleActivate"
>
  <slot />
</button>
```

## Testing Strategy

### Unit Tests (Vitest)

Setiap komponen dan composable memiliki unit tests:

```ts
describe('VButton', () => {
  it('renders with correct variant class', () => {
    const wrapper = mount(VButton, {
      props: { variant: 'primary' },
    })
    expect(wrapper.classes()).toContain('bg-primary-600')
  })
})
```

### E2E Tests (Playwright)

Integration tests untuk user flows:

```ts
test('modal opens and closes correctly', async ({ page }) => {
  await page.click('[data-testid="open-modal"]')
  await expect(page.locator('[role="dialog"]')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('[role="dialog"]')).not.toBeVisible()
})
```

### Accessibility Tests (axe-core)

Automated a11y checks di setiap test:

```ts
test('button is accessible', async ({ page }) => {
  await page.goto('/components/button')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

## Pertimbangan Performa

1. **CSS-in-JS Dihindari** - Menggunakan Tailwind CSS untuk minimal runtime
2. **Lazy Loading** - Komponen dapat di-import individual
3. **Minimal Dependencies** - Zero runtime dependencies selain Vue
4. **Optimized Transitions** - CSS transitions, bukan JavaScript animations
