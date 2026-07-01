Add a new project entry to the Supabase `projects` table.

## Steps

1. **Collect**:
   - `name` (short, mono-style identifier, e.g. `k8s-cost-exporter`)
   - `description` (one sentence)
   - `stack` (comma-separated list, e.g. `Go, Prometheus, Helm`)
   - `github_url`
   - `sort_order` (leave blank to auto-assign)

2. **Auto-assign sort order** if not provided:
   ```sql
   SELECT COALESCE(MAX(sort_order), 0) + 1 FROM projects;
   ```

3. **Insert** using `mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__execute_sql`:
   ```sql
   INSERT INTO projects (name, description, stack, github_url, sort_order)
   VALUES (
     '<name>',
     '<description>',
     ARRAY['tech1', 'tech2'],
     '<github_url>',
     <sort_order>
   );
   ```

4. **Confirm** insertion. The project appears live after the next ISR revalidation (1 hour) or a manual Vercel redeploy.
