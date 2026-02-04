import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('playground page has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('buttons are keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    const button = page.locator('button:has-text("Primary")').first()
    
    // Focus the button
    await button.focus()
    await expect(button).toBeFocused()
    
    // Activate with Enter
    await page.keyboard.press('Enter')
  })

  test('inputs have proper labels', async ({ page }) => {
    await page.goto('/')
    
    // Check that inputs have associated labels
    const inputs = page.locator('input:not([type="hidden"])')
    const count = await inputs.count()
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        const ariaLabel = await input.getAttribute('aria-label')
        const ariaLabelledBy = await input.getAttribute('aria-labelledby')
        
        // Input should have a label, aria-label, or aria-labelledby
        const hasLabel = await label.isVisible() || ariaLabel || ariaLabelledBy
        expect(hasLabel).toBeTruthy()
      }
    }
  })

  test('modals trap focus correctly', async ({ page }) => {
    await page.goto('/')
    
    // Open modal
    const triggerButton = page.locator('button:has-text("Submit Form")')
    await triggerButton.click()
    
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()
    
    // Tab through and ensure focus stays in modal
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement
        return el ? el.closest('[role="dialog"]') !== null : false
      })
      
      // Focus should remain within the modal
      if (await modal.isVisible()) {
        expect(activeElement).toBe(true)
      }
    }
  })
})
