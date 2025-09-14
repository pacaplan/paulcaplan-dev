import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the under construction page', async ({ page }) => {
    await page.goto('/')
    
    // Check main heading
    await expect(page.getByText('🚧 UNDER CONSTRUCTION 🚧')).toBeVisible()
    
    // Check welcome message
    await expect(page.getByText('Welcome to the Future! 🌟')).toBeVisible()
    
    // Check server status
    await expect(page.getByText('Server Status: Online')).toBeVisible()
  })

  test('should navigate to chat page', async ({ page }) => {
    await page.goto('/')
    
    // Click the chat link
    await page.getByText('💬 Enter the Chat Room').click()
    
    // Should be on chat page
    await expect(page).toHaveURL('/chat')
    await expect(page.getByText('🤖 AI Chat')).toBeVisible()
  })

  test('should have proper styling and animations', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page has the gradient background
    const body = page.locator('body')
    await expect(body).toHaveCSS('background-color', /rgb\(240, 240, 240\)/)
    
    // Check that blinking elements exist
    const blinkingElements = page.locator('.blink')
    await expect(blinkingElements).toHaveCount(3)
  })
})
