import { env } from '@/lib/env'

export async function POST (req: Request): Promise<Response> {
  try {
    const { messages } = await req.json()

    // Check if we should use mock responses
    if (env.USE_MOCK_AI) {
      console.log('Using mock AI response')
      const mockResponse = {
        id: `chatcmpl-mock-${Date.now()}`,
        object: 'chat.completion',
        created: Date.now(),
        model: env.OPENROUTER_MODEL,
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: "Hello! I'm a mock AI response. The chat interface is working correctly! 🎉 To use real AI responses, set USE_MOCK_AI=false in your environment variables."
          },
          finish_reason: 'stop'
        }]
      }
      
      return new Response(JSON.stringify(mockResponse), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })
    }

    // Use real OpenRouter API
    console.log('Using real OpenRouter API')
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
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error response:', errorText)
      
      // If API key limit exceeded, return a helpful error message
      if (response.status === 403 && errorText.includes('Key limit exceeded')) {
        const errorResponse = {
          id: `chatcmpl-error-${Date.now()}`,
          object: 'chat.completion',
          created: Date.now(),
          model: env.OPENROUTER_MODEL,
          choices: [{
            index: 0,
            message: {
              role: 'assistant',
              content: "Sorry, your OpenRouter API key has exceeded its limit. Please check your account at https://openrouter.ai/settings/keys and either add credits or get a new API key. You can also set USE_MOCK_AI=true in your environment variables to use mock responses for testing."
            },
            finish_reason: 'stop'
          }]
        }
        
        return new Response(JSON.stringify(errorResponse), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        })
      }
      
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
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
