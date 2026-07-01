Write and publish a new deep-dive article into the Supabase `articles` table.

## Steps

1. **Topic**: Ask for the topic if not already provided. Target audience: senior platform/DevOps/K8s engineers. Skip basics; go deep.

2. **Generate the article**:
   - Length: 1500–2500 words
   - Format: valid semantic HTML using `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<code>`, `<pre><code class="language-*">` — no outer `<html>`/`<body>` wrapper
   - Tone: direct, no filler, concrete examples, production war-story mindset

3. **Derive metadata**:
   - `slug`: kebab-case, lowercase (e.g. `ebpf-observability-deep-dive`)
   - `description`: 1–2 sentences, plain text, no HTML

4. **Insert into Supabase** using `mcp__ecba3a11-9de9-4e61-8b58-842aa9180813__execute_sql`:
   ```sql
   INSERT INTO articles (slug, title, description, content, published_at, published)
   VALUES (
     '<slug>',
     '<title>',
     '<description>',
     '<html_content_escaped>',
     NOW(),
     true
   );
   ```
   Use dollar-quoting (`$body$...$body$`) if the content contains single quotes.

5. **Confirm** and print the live URL:
   `https://portfolio-topaz-sigma-21.vercel.app/writing/<slug>`
