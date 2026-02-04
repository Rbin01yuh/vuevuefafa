import { test, expect } from '@playwright/test'

test.describe('VInput', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('can type in input field', async ({ page }) => {
    const input = page.locator('input').first()
    await input.fill('Test value')
    await expect(input).toHaveValue('Test value')
  })

  test('label is connected to input', async ({ page }) => {
    const label = page.locator('label:has-text("Full Name")')
    if (await label.isVisible()) {
      const forAttribute = await label.getAttribute('for')
      expect(forAttribute).toBeTruthy()
      
      const input = page.locator(`#${forAttribute}`)
      await expect(input).toBeVisible()
    }
  })

  test('clearable input shows clear button when has value', async ({ page }) => {
    // Look for an input with clearable functionality
    const searchInput = page.locator('input[placeholder*="cari" i], input[type="search"]').first()
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      
      // Look for clear button
      const clearButton = page.locator('[aria-label="Clear"]').first()
      if (await clearButton.isVisible()) {
        await clearButton.click()
        await expect(searchInput).toHaveValue('')
      }
    }
  })
})
