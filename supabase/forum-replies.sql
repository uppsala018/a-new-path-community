alter table public.forum_posts
add column if not exists parent_post_id uuid references public.forum_posts(id) on delete cascade;
