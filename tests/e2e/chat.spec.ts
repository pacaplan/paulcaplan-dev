import { test, expect } from '@playwright/test'

test.describe('Chat Page', () => {
  test('should display the chat interface', async ({ page }) => {
    await page.goto('/chat')
    
    // Check page title
    await expect(page.getByText('🤖 AI Chat')).toBeVisible()
    
    // Check back to home link
    await expect(page.getByText('← Back to Home')).toBeVisible()
    
    // Check welcome message
    await expect(page.getByText('Hello! How can I help you today?')).toBeVisible()
  })

  test('should have working input and send button', async ({ page }) => {
    await page.goto('/chat')
    
    // Check input field
    const input = page.getByPlaceholder('Type your message here...')
    await expect(input).toBeVisible()
    
    // Check send button
    const sendButton = page.getByText('Send')
    await expect(sendButton).toBeVisible()
    await expect(sendButton).toBeDisabled() // Should be disabled when input is empty
    
    // Type a message
    await input.fill('Hello, AI!')
    await expect(sendButton).toBeEnabled()
  })

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/chat')
    
    // Click back to home
    await page.getByText('← Back to Home').click()
    
    // Should be on home page
    await expect(page).toHaveURL('/')
    await expect(page.getByText('🚧 UNDER CONSTRUCTION 🚧')).toBeVisible()
  })

  test('should show powered by message', async ({ page }) => {
    await page.goto('/chat')
    
    await expect(page.getByText('Powered by OpenRouter AI • Model configured via environment variables')).toBeVisible()
  })
})
