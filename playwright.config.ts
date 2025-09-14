import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  timeout: 1000, // 1 second timeout
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 1000, // 1 second for actions
    navigationTimeout: 5000 // 5 seconds for navigation
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  // webServer: {
  //   command: 'pnpm run dev -- --port 3001',
  //   url: 'http://localhost:3001',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000, // 2 minutes
  //   env: {
  //     // Test environment variables
  //     OPENROUTER_API_KEY: 'test-api-key',
  //     OPENROUTER_MODEL: 'test-model',
  //     USE_MOCK_AI: 'true',
  //     NEXT_PUBLIC_APP_URL: 'http://localhost:3001',
  //     NODE_ENV: 'test'
  //   }
  // }
})
