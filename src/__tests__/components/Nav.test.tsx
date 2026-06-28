import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Nav from '@/components/Nav'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode
    href: string
    className?: string
    onClick?: () => void
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}))

describe('Nav', () => {
  it('renders the brand name linking to /', () => {
    render(<Nav />)
    const brand = screen.getByRole('link', { name: 'Hassan Ali' })
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveAttribute('href', '/')
  })

  it('renders Writing link', () => {
    render(<Nav />)
    const link = screen.getAllByRole('link', { name: 'Writing' })[0]
    expect(link).toHaveAttribute('href', '/writing')
  })

  it('renders Projects link', () => {
    render(<Nav />)
    const link = screen.getAllByRole('link', { name: 'Projects' })[0]
    expect(link).toHaveAttribute('href', '/projects')
  })

  it('renders Contact link', () => {
    render(<Nav />)
    const link = screen.getAllByRole('link', { name: 'Contact' })[0]
    expect(link).toHaveAttribute('href', '/#contact')
  })

  it('renders the search button', () => {
    render(<Nav />)
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('shows hamburger icon by default (mobile menu closed)', () => {
    render(<Nav />)
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
    expect(screen.queryByText('✕')).not.toBeInTheDocument()
  })

  it('opens the mobile menu on hamburger click', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: /menu/i }))
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('closes the mobile menu on a second click', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(screen.queryByText('✕')).not.toBeInTheDocument()
  })

  it('closes the mobile menu when a mobile link is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: /menu/i }))
    // mobile menu is now open — click the Writing link inside it
    const mobileWritingLinks = screen.getAllByRole('link', { name: 'Writing' })
    fireEvent.click(mobileWritingLinks[mobileWritingLinks.length - 1])
    expect(screen.queryByText('✕')).not.toBeInTheDocument()
  })
})
