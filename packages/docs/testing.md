# Testing & QA

vuevuefafa menggunakan testing strategy komprehensif untuk menjamin kualitas.

## Unit Testing dengan Vitest

```bash
# Jalankan unit tests
pnpm test:unit

# Watch mode
pnpm test:unit -- --watch

# Coverage report
pnpm test:unit -- --coverage
```

### Contoh Test

```ts
import { mount } from '@vue/test-utils'
import { VButton } from 'vuevuefafa'

describe('VButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(VButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(VButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

## E2E Testing dengan Playwright

```bash
# Jalankan E2E tests
pnpm test:e2e

# UI mode
pnpm test:e2e -- --ui

# Headed mode
pnpm test:e2e -- --headed
```

### Contoh E2E Test

```ts
import { test, expect } from '@playwright/test'

test('modal opens and closes', async ({ page }) => {
  await page.goto('/playground')
  await page.click('[data-testid="open-modal"]')

  await expect(page.locator('[role="dialog"]')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('[role="dialog"]')).not.toBeVisible()
})
```

## Accessibility Testing dengan axe-core

```ts
import AxeBuilder from '@axe-core/playwright'

test('page has no a11y violations', async ({ page }) => {
  await page.goto('/components/button')

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

## Test Coverage

Kami menargetkan coverage minimal 80% untuk:

- Unit tests (komponen dan composables)
- E2E tests (user flows utama)
- Accessibility tests (semua komponen)
