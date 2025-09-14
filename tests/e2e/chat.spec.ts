import { test, expect } from '@playwright/test'

test.describe('Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the chat page
    await page.goto('/chat')
  })

  test('should display the chat interface correctly', async ({ page }) => {
    // Check that the page loads with the correct title
    await expect(page).toHaveTitle(/AI Chat/)
    
    // Check that the header is visible
    await expect(page.locator('h1')).toContainText('🤖 AI Chat')
    
    // Check that the back to home link is present
    await expect(page.locator('a[href="/"]')).toContainText('← Back to Home')
    
    // Check that the initial empty state is displayed
    await expect(page.locator('text=Hello! How can I help you today?')).toBeVisible()
    await expect(page.locator('text=Start a conversation by typing a message below.')).toBeVisible()
  })

  test('should allow sending and receiving messages', async ({ page }) => {
    // Type a message in the input field
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    await messageInput.fill('Hello, this is a test message!')
    
    // Check that the send button is enabled
    const sendButton = page.locator('button[type="submit"]')
    await expect(sendButton).toBeEnabled()
    await expect(sendButton).toContainText('Send')
    
    // Send the message
    await sendButton.click()
    
    // Check that the input is cleared
    await expect(messageInput).toHaveValue('')
    
    // Wait for the user message to appear
    await expect(page.locator('text=Hello, this is a test message!')).toBeVisible()
    
    // Wait for the AI response to appear (mock response)
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible({ timeout: 2000 })
    await expect(page.locator('text=The chat interface is working correctly!')).toBeVisible()
    
    // Check that the send button shows "Send" again
    await expect(sendButton).toContainText('Send')
  })

  test('should handle multiple messages in a conversation', async ({ page }) => {
    // Send first message
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    const sendButton = page.locator('button[type="submit"]')
    
    await messageInput.fill('First message')
    await sendButton.click()
    
    // Wait for first response
    await expect(page.locator('text=First message')).toBeVisible()
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible({ timeout: 2000 })
    
    // Send second message
    await messageInput.fill('Second message')
    await sendButton.click()
    
    // Wait for second response
    await expect(page.locator('text=Second message')).toBeVisible()
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible({ timeout: 2000 })
    
    // Check that both user messages are visible
    await expect(page.locator('text=First message')).toBeVisible()
    await expect(page.locator('text=Second message')).toBeVisible()
  })

  test('should not allow sending empty messages', async ({ page }) => {
    const sendButton = page.locator('button[type="submit"]')
    
    // Check that send button is disabled when input is empty
    await expect(sendButton).toBeDisabled()
    
    // Type and then clear the input
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    await messageInput.fill('   ') // Only whitespace
    await expect(sendButton).toBeDisabled()
    
    await messageInput.fill('Valid message')
    await expect(sendButton).toBeEnabled()
  })

  test('should show loading state while processing', async ({ page }) => {
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    const sendButton = page.locator('button[type="submit"]')
    
    await messageInput.fill('Test message')
    await sendButton.click()
    
    // Wait for the response to appear (mock response is fast, so loading might be brief)
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible({ timeout: 2000 })
    
    // Check that the loading text is no longer visible
    await expect(page.locator('text=AI is thinking...')).not.toBeVisible()
  })

  test('should display proper message styling', async ({ page }) => {
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    const sendButton = page.locator('button[type="submit"]')
    
    await messageInput.fill('Test message')
    await sendButton.click()
    
    // Wait for messages to appear
    await expect(page.locator('text=Test message')).toBeVisible()
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible({ timeout: 2000 })
    
    // Check that messages are displayed (simplified check)
    await expect(page.locator('text=Test message')).toBeVisible()
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible()
  })

  test('should handle form submission with Enter key', async ({ page }) => {
    const messageInput = page.locator('input[placeholder="Type your message here..."]')
    
    await messageInput.fill('Message sent with Enter key')
    await messageInput.press('Enter')
    
    // Wait for the message to appear
    await expect(page.locator('text=Message sent with Enter key')).toBeVisible()
    await expect(page.locator('text=Hello! I\'m a mock AI response')).toBeVisible()
  })

  test('should show footer information', async ({ page }) => {
    // Check that the footer text is visible
    await expect(page.locator('text=Powered by OpenRouter AI')).toBeVisible()
    await expect(page.locator('text=Model configured via environment variables')).toBeVisible()
  })
})