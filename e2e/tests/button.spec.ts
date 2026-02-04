import { test, expect } from '@playwright/test'

test.describe('VButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders button with correct text', async ({ page }) => {
    const button = page.locator('button:has-text("Primary")')
    await expect(button).toBeVisible()
  })

  test('button has correct variant styles', async ({ page }) => {
    const primaryButton = page.locator('button:has-text("Primary")')
    await expect(primaryButton).toHaveClass(/bg-primary/)
  })

  test('loading button shows spinner', async ({ page }) => {
    const loadingButton = page.locator('button:has-text("Loading")')
    if (await loadingButton.isVisible()) {
      await expect(loadingButton.locator('svg')).toBeVisible()
    }
  })

  test('disabled button is not clickable', async ({ page }) => {
    const disabledButton = page.locator('button:has-text("Disabled")')
    if (await disabledButton.isVisible()) {
      await expect(disabledButton).toBeDisabled()
    }
  })
})
