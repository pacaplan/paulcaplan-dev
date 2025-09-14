import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the under construction message', () => {
    render(<Home />)

    expect(screen.getByText('🚧 UNDER CONSTRUCTION 🚧')).toBeInTheDocument()
    expect(screen.getByText('Welcome to the Future! 🌟')).toBeInTheDocument()
  })

  it('has a link to the chat page', () => {
    render(<Home />)

    const chatLink = screen.getByText('💬 Enter the Chat Room')
    expect(chatLink).toBeInTheDocument()
    expect(chatLink.closest('a')).toHaveAttribute('href', '/chat')
  })

  it('displays server status', () => {
    render(<Home />)

    expect(screen.getByText('Server Status: Online')).toBeInTheDocument()
  })

  it('shows current date', () => {
    render(<Home />)

    const currentDate = new Date().toLocaleDateString()
    expect(screen.getByText(`Last updated: ${currentDate}`)).toBeInTheDocument()
  })
})
