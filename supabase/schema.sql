create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  handle text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.member_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.interest_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  preferred_path text not null,
  message text not null default '',
  submitted_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_handle text not null,
  channel text not null,
  message text not null,
  parent_post_id uuid references public.forum_posts(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  session_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  user_email text,
  user_handle text,
  path text,
  route text,
  method text,
  status_code integer,
  duration_ms integer,
  referrer text,
  user_agent text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;
alter table public.member_progress enable row level security;
alter table public.interest_submissions enable row level security;
alter table public.forum_posts enable row level security;
alter table public.usage_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id);

drop policy if exists "member_progress_select_own" on public.member_progress;
create policy "member_progress_select_own"
on public.member_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "member_progress_update_own" on public.member_progress;
create policy "member_progress_update_own"
on public.member_progress
for update
to authenticated
using (auth.uid() = user_id);

drop policy if exists "member_progress_insert_own" on public.member_progress;
create policy "member_progress_insert_own"
on public.member_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "interest_submit_public" on public.interest_submissions;
create policy "interest_submit_public"
on public.interest_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "forum_posts_select_authenticated" on public.forum_posts;
create policy "forum_posts_select_authenticated"
on public.forum_posts
for select
to authenticated
using (true);

drop policy if exists "forum_posts_insert_own" on public.forum_posts;
create policy "forum_posts_insert_own"
on public.forum_posts
for insert
to authenticated
with check (auth.uid() = user_id);

create index if not exists usage_events_created_at_idx on public.usage_events (created_at desc);
create index if not exists usage_events_event_type_idx on public.usage_events (event_type);
create index if not exists usage_events_session_id_idx on public.usage_events (session_id);
create index if not exists usage_events_user_id_idx on public.usage_events (user_id);
