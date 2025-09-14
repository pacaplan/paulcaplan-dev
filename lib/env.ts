import { z } from 'zod'

// Environment validation schema
const envSchema = z.object({
  // OpenRouter configuration
  OPENROUTER_API_KEY: z.string().min(1, 'OpenRouter API key is required'),
  OPENROUTER_MODEL: z.string().min(1, 'OpenRouter model is required'),
  
  // Optional: Add more environment variables as needed
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      throw new Error(
        `Environment validation failed:\n${missingVars.join('\n')}\n\n` +
        'Please check your .env.local file and ensure all required variables are set.'
      )
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>
