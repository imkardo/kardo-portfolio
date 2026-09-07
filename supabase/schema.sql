-- Supabase backend for Kardo Heidari portfolio admin
-- Run this in Supabase Dashboard → SQL Editor.

create table if not exists site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  project text not null default '',
  budget text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

alter table site_content enable row level security;
alter table inquiries enable row level security;

-- Public site can read content; only authenticated admin can write.
drop policy if exists "public read site_content" on site_content;
create policy "public read site_content"
  on site_content for select
  using (true);

-- Only the site owner can write. Even with open signup, random
-- authenticated users get nothing. IMPORTANT: also turn OFF public
-- signup in Dashboard → Authentication → Providers → Email
-- ("Allow new users to sign up"), and create your user manually.
-- Replace the email below if your admin address ever changes.
drop policy if exists "admin write site_content" on site_content;
create policy "admin write site_content"
  on site_content for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'kardoheydari.1387@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'kardoheydari.1387@gmail.com');

-- Anyone can submit the contact form; only admin reads inquiries.
drop policy if exists "public insert inquiries" on inquiries;
create policy "public insert inquiries"
  on inquiries for insert
  with check (true);

drop policy if exists "admin read inquiries" on inquiries;
create policy "admin read inquiries"
  on inquiries for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'kardoheydari.1387@gmail.com');
