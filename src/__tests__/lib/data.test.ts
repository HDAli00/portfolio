import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPublishedArticles, getArticleBySlug, getProjects } from '@/lib/data'
import { supabase } from '@/lib/supabase'

vi.mock('@/lib/supabase', () => ({
  supabase: { from: vi.fn() },
}))

// Creates a fluent Supabase query builder mock that resolves to `result`
function makeChain(result: { data: unknown; error: unknown }) {
  const chain = {
    select: vi.fn(),
    eq: vi.fn(),
    order: vi.fn().mockResolvedValue(result),
    single: vi.fn().mockResolvedValue(result),
  }
  chain.select.mockReturnValue(chain)
  chain.eq.mockReturnValue(chain)
  return chain
}

const mockFrom = vi.mocked(supabase.from)

beforeEach(() => vi.clearAllMocks())

describe('getPublishedArticles', () => {
  it('returns articles when query succeeds', async () => {
    const rows = [
      { id: '1', slug: 'test', title: 'Test', description: 'Desc', published_at: '2025-01-01' },
    ]
    mockFrom.mockReturnValue(makeChain({ data: rows, error: null }) as never)

    expect(await getPublishedArticles()).toEqual(rows)
  })

  it('returns [] on Supabase error', async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: 'db error' } }) as never)
    expect(await getPublishedArticles()).toEqual([])
  })

  it('returns [] when data is null with no error', async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: null }) as never)
    expect(await getPublishedArticles()).toEqual([])
  })

  it('returns [] when the client throws', async () => {
    mockFrom.mockImplementation(() => { throw new Error('network') })
    expect(await getPublishedArticles()).toEqual([])
  })
})

describe('getArticleBySlug', () => {
  it('returns the article when found', async () => {
    const article = {
      id: '1', slug: 'my-post', title: 'My Post', description: 'Desc',
      content: '<p>hi</p>', published_at: '2025-01-01', published: true,
    }
    mockFrom.mockReturnValue(makeChain({ data: article, error: null }) as never)

    expect(await getArticleBySlug('my-post')).toEqual(article)
  })

  it('returns null on error', async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: 'not found' } }) as never)
    expect(await getArticleBySlug('missing')).toBeNull()
  })

  it('returns null when the client throws', async () => {
    mockFrom.mockImplementation(() => { throw new Error('timeout') })
    expect(await getArticleBySlug('any')).toBeNull()
  })
})

describe('getProjects', () => {
  it('returns projects when query succeeds', async () => {
    const rows = [
      { id: '1', name: 'k8s-tools', description: 'Tooling', stack: ['Go', 'K8s'], github_url: 'https://github.com/x', sort_order: 1 },
    ]
    mockFrom.mockReturnValue(makeChain({ data: rows, error: null }) as never)

    expect(await getProjects()).toEqual(rows)
  })

  it('returns [] on Supabase error', async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: 'fail' } }) as never)
    expect(await getProjects()).toEqual([])
  })

  it('returns [] when data is null with no error', async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: null }) as never)
    expect(await getProjects()).toEqual([])
  })

  it('returns [] when the client throws', async () => {
    mockFrom.mockImplementation(() => { throw new Error('network') })
    expect(await getProjects()).toEqual([])
  })
})
