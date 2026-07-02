-- Admin portal migration — run this once in the Supabase SQL editor
-- (after schema.sql). It adds the editable site-copy table and grants
-- full read/write access to authenticated users (i.e. you, the admin).
--
-- Setup:
--   1. Run this file in the Supabase SQL editor.
--   2. In Supabase → Authentication → Users, create your admin user
--      (email + password).
--   3. In Supabase → Authentication → Sign In / Up, disable public
--      sign-ups so nobody else can create an account.

-- Site content table (key/value store for every piece of page copy)
create table if not exists site_content (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "Public can read site content"
  on site_content for select
  using (true);

-- Authenticated (admin) full access
create policy "Authenticated can manage site content"
  on site_content for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage articles"
  on articles for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage projects"
  on projects for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage highlights"
  on highlights for all
  to authenticated
  using (true)
  with check (true);
