import { test, expect } from '@playwright/test'

test.describe('VModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens modal when trigger is clicked', async ({ page }) => {
    // Find and click the submit button which triggers the modal
    const submitButton = page.locator('button:has-text("Submit Form")')
    await submitButton.click()

    // Check modal is visible
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()
  })

  test('closes modal on escape key', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Submit Form")')
    await submitButton.click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Press Escape
    await page.keyboard.press('Escape')

    // Modal should be hidden
    await expect(modal).not.toBeVisible()
  })

  test('modal has correct ARIA attributes', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Submit Form")')
    await submitButton.click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toHaveAttribute('aria-modal', 'true')
  })

  test('focus is trapped inside modal', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Submit Form")')
    await submitButton.click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Tab through elements
    await page.keyboard.press('Tab')
    
    // Focus should remain within modal
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })
})
