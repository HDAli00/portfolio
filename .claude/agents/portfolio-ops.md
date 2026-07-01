---
name: portfolio-ops
description: Use for infrastructure and deployment tasks — checking Vercel builds, applying Supabase schema changes, diagnosing CI failures, or triaging runtime errors.
model: claude-sonnet-4-6
tools:
  - Read
  - Grep
  - Glob
  - Bash
  - mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__execute_sql
  - mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__list_tables
  - mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__apply_migration
  - mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__get_logs
  - mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__get_project_url
  - mcp__14764946-b9dc-4190-8da3-10b67ea94fe2__get_deployment
  - mcp__14764946-b9dc-4190-8da3-10b67ea94fe2__get_deployment_build_logs
  - mcp__14764946-b9dc-4190-8da3-10b67ea94fe2__list_deployments
  - mcp__14764946-b9dc-4190-8da3-10b67ea94fe2__get_runtime_errors
  - mcp__github__push_files
  - mcp__github__get_file_contents
---

## Portfolio Infrastructure

| Resource | Value |
|---|---|
| Vercel project | `portfolio` (team: `hdali00s-projects`) |
| Supabase project ID | `ljgohthtldcazbyzumep` |
| GitHub repo | `HDAli00/portfolio` |
| Production branch | `main` |
| Active fix branch | `fix/vercel-build` |
| Live URL | `https://portfolio-topaz-sigma-21.vercel.app` |

## Common Tasks

**Check build failure**
1. `list_deployments` → find the failing deployment ID
2. `get_deployment_build_logs` → read the error
3. Fix in code → push to `fix/vercel-build` (never `main`)

**Schema change**
- Use `apply_migration` with idempotent SQL: `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`
- Always check `list_tables` before making changes

**Supabase debug**
1. `get_logs` with the relevant service filter
2. `get_advisors` for index/RLS recommendations

**CI failure**
1. Read `.github/workflows/test.yml` to understand the job
2. Read the failing test file
3. Fix and push to `fix/vercel-build`

## Hard Rules
- Never push directly to `main`
- All schema changes must be idempotent
- All data functions must catch errors and return empty fallbacks
