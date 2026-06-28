import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import TypewriterGreeting from '@/components/TypewriterGreeting'

describe('TypewriterGreeting', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders the greeting prefix', () => {
    render(<TypewriterGreeting />)
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
  })

  it('displays the first phrase on initial render', () => {
    render(<TypewriterGreeting />)
    expect(screen.getByText('/hassan')).toBeInTheDocument()
  })

  it('renders a blinking cursor element', () => {
    const { container } = render(<TypewriterGreeting />)
    expect(container.querySelector('.cursor-blink')).toBeInTheDocument()
  })

  it('removes one character after one delete interval (35 ms)', async () => {
    render(<TypewriterGreeting />)
    // Initial: displayed='/hassan' (7 chars), deleting=true
    // After one DELETE_SPEED tick the last char is removed → '/hassa'
    await act(async () => {
      vi.advanceTimersByTime(35)
    })
    expect(screen.queryByText('/hassan')).not.toBeInTheDocument()
  })

  it('clears the phrase completely after all chars are deleted', async () => {
    render(<TypewriterGreeting />)
    // 7 chars × 35 ms each = 245 ms minimum to empty the phrase
    await act(async () => {
      vi.advanceTimersByTime(35 * 7 + 10)
    })
    expect(screen.queryByText('/hassan')).not.toBeInTheDocument()
  })
})
