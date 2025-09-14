'use client'

import { useState } from 'react'
import ErrorBoundary, { ChatErrorFallback } from '@/components/ErrorBoundary'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage () {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ErrorBoundary fallback={ChatErrorFallback}>
      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b'>
          <div className='max-w-4xl mx-auto px-4 py-4'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-gray-900'>
                🤖 AI Chat
              </h1>
              <a
                href='/'
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className='max-w-4xl mx-auto px-4 py-6'>
          <div className='bg-white rounded-lg shadow-lg h-[600px] flex flex-col'>
            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-6 space-y-4'>
              {messages.length === 0 && (
                <div className='text-center text-gray-500 mt-8'>
                  <div className='text-4xl mb-4'>👋</div>
                  <p className='text-lg'>Hello! How can I help you today?</p>
                  <p className='text-sm mt-2'>Start a conversation by typing a message below.</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <div className='whitespace-pre-wrap'>{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                    >
                      {message.role === 'user' ? 'You' : 'AI'}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-gray-200 text-gray-900 rounded-lg px-4 py-2'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex space-x-1'>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' />
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }} />
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className='text-sm'>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className='border-t p-4'>
              <form onSubmit={handleFormSubmit} className='flex gap-2'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type your message here...'
                  className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  disabled={isLoading}
                />
                <button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </form>

              <div className='mt-2 text-xs text-gray-500 text-center'>
                Powered by OpenRouter AI • Model configured via environment variables
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
