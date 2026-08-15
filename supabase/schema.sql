-- Ejecuta este archivo en Supabase > SQL Editor.
-- Cada cuenta solo puede leer y modificar su propia colección.

create table if not exists public.watch_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  logs jsonb not null default '{}'::jsonb,
  media jsonb not null default '{"covers":{},"characterImages":{}}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.watch_profiles enable row level security;

drop policy if exists "watch_profiles_select_own" on public.watch_profiles;
create policy "watch_profiles_select_own" on public.watch_profiles
for select using (auth.uid() = user_id);

drop policy if exists "watch_profiles_insert_own" on public.watch_profiles;
create policy "watch_profiles_insert_own" on public.watch_profiles
for insert with check (auth.uid() = user_id);

drop policy if exists "watch_profiles_update_own" on public.watch_profiles;
create policy "watch_profiles_update_own" on public.watch_profiles
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "watch_profiles_delete_own" on public.watch_profiles;
create policy "watch_profiles_delete_own" on public.watch_profiles
for delete using (auth.uid() = user_id);
