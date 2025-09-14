import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { env } from '@/lib/env'

// Configure OpenAI client with OpenRouter
const openaiClient = openai({
  apiKey: env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: openaiClient(env.OPENROUTER_MODEL),
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
