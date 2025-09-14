import { render, screen } from '@testing-library/react'
import ChatPage from '@/app/chat/page'

// Mock the useChat hook
jest.mock('ai/react', () => ({
  useChat: () => ({
    messages: [],
    input: '',
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false
  })
}))

describe('Chat Page', () => {
  it('renders the chat interface', () => {
    render(<ChatPage />)
    
    expect(screen.getByText('🤖 AI Chat')).toBeInTheDocument()
    expect(screen.getByText('← Back to Home')).toBeInTheDocument()
  })

  it('shows welcome message when no messages', () => {
    render(<ChatPage />)
    
    expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument()
    expect(screen.getByText('Start a conversation by typing a message below.')).toBeInTheDocument()
  })

  it('has a message input and send button', () => {
    render(<ChatPage />)
    
    expect(screen.getByPlaceholderText('Type your message here...')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('shows powered by message', () => {
    render(<ChatPage />)
    
    expect(screen.getByText('Powered by OpenRouter AI • Model configured via environment variables')).toBeInTheDocument()
  })
})
