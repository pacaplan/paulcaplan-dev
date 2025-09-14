import { env } from '@/lib/env'

export async function POST (req: Request): Promise<Response> {
  try {
    const { messages } = await req.json()

    // Simple OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Next.js AI Chat Starter'
      },
      body: JSON.stringify({
        model: env.OPENROUTER_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
