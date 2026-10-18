-- Шийдэл вэб сайтын админ хэсгийн тохиргоо.
-- Supabase → SQL Editor → New query → энэ файлыг бүтнээр нь хуулж "Run" дарна.

-- 1. Нийтлэлийн хүснэгт
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('blog','insight')),
  title       text not null,
  summary     text,
  area        text default 'all',
  author      text,
  cover_url   text,
  blocks      jsonb not null default '[]'::jsonb,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists posts_type_created on public.posts (type, created_at desc);

-- 2. Хандалтын эрх: хүн бүр нийтлэгдсэнийг уншина, зөвхөн нэвтэрсэн админ бичнэ
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts
  for select using (published = true);

drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts" on public.posts
  for select to authenticated using (true);

drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts" on public.posts
  for insert to authenticated with check (true);

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts" on public.posts
  for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts" on public.posts
  for delete to authenticated using (true);

-- 3. Зураг, видеоны сан (50MB хүртэлх файл)
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;

drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "Admins can upload media" on storage.objects;
create policy "Admins can upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "Admins can delete media" on storage.objects;
create policy "Admins can delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
