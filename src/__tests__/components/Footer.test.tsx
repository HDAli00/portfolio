import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('© 2025 Hassan Ali')).toBeInTheDocument()
  })

  it('renders GitHub link with correct href', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/HDAli00'
    )
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/hdali'
    )
  })

  it('renders Email link with correct href', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:hello@hdalidocs.dev'
    )
  })

  it('opens external links in a new tab with rel=noopener', () => {
    render(<Footer />)
    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedin).toHaveAttribute('target', '_blank')
  })

  it('does not open mailto link in a new tab', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Email' })).not.toHaveAttribute('target', '_blank')
  })
})
