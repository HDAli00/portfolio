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

-- Messages sent from the footer contact form
create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Anyone may send a message; only the signed-in admin can read/manage them
create policy "Anyone can send a message"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read messages"
  on contact_messages for select
  to authenticated
  using (true);

create policy "Authenticated can delete messages"
  on contact_messages for delete
  to authenticated
  using (true);

-- Storage bucket for images embedded in articles (public read; the
-- article page serves them straight from the Supabase CDN URL)
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

create policy "Authenticated can read article images"
  on storage.objects for select to authenticated
  using (bucket_id = 'article-images');

create policy "Authenticated can upload article images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'article-images');

create policy "Authenticated can update article images"
  on storage.objects for update to authenticated
  using (bucket_id = 'article-images');

create policy "Authenticated can delete article images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'article-images');
