-- ==============================================================================
-- RootAccess Database Schema — Phase 1: Authentication & User Profiles
-- ==============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project -> Go to the "SQL Editor" in the left sidebar.
-- 3. Click "New Query", paste this entire script, and click "Run".
-- ==============================================================================

-- 1. Create the user profiles table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
-- This ensures that by default, NO user can read or write any row unless a policy allows it.
alter table public.profiles enable row level security;

-- 3. Define RLS Policies for secure data access:
-- Rule: A user can only view their own profile.
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Rule: A user can only update their own profile.
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Rule: A user can insert their own profile.
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- 4. Automatic Profile Creation Trigger
-- When a user registers through Supabase Auth (auth.users), this trigger automatically
-- creates their corresponding profile record in public.profiles.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'RootAccess Student'),
    coalesce(new.email, '')
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = coalesce(excluded.email, public.profiles.email),
    updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Bind trigger to auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Done! Your profiles table is secure and ready for Phase 1.
