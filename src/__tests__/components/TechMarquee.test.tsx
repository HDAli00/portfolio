import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TechMarquee from '@/components/TechMarquee'

const ALL_TECHS = [
  'Kubernetes', 'OpenTelemetry', 'Python', 'Docker',
  'Terraform', 'AWS', 'Azure', 'Grafana',
  'Spark', 'Ansible', 'GitHub Actions', 'Helm',
]

describe('TechMarquee', () => {
  it('renders every technology name', () => {
    render(<TechMarquee />)
    for (const tech of ALL_TECHS) {
      expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('duplicates each item for seamless infinite scroll', () => {
    render(<TechMarquee />)
    for (const tech of ['Kubernetes', 'Docker', 'AWS', 'Helm']) {
      expect(screen.getAllByText(tech)).toHaveLength(2)
    }
  })

  it('renders 24 items total (12 techs × 2 copies)', () => {
    const { container } = render(<TechMarquee />)
    const track = container.querySelector('.marquee-track')
    expect(track?.children).toHaveLength(24)
  })
})
