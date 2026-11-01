-- ==============================================================================
-- RootAccess: Enrollment Requests & Admin Approval Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- ==============================================================================

-- 1. Create table for Enrollment & Payment Requests
create table if not exists public.enrollment_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text not null,
  user_name text not null,
  course_slug text not null,
  course_title text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  upi_reference text default '',
  student_notes text default '',
  requested_at timestamp with time zone default timezone('Asia/Kolkata'::text, now()) not null,
  reviewed_at timestamp with time zone,
  reviewed_by text,
  unique (user_id, course_slug)
);

-- 2. Enable RLS
alter table public.enrollment_requests enable row level security;

-- 3. Policy: Students can view their own enrollment requests
drop policy if exists "Students can view own enrollment requests" on public.enrollment_requests;
create policy "Students can view own enrollment requests"
  on public.enrollment_requests for select
  using (auth.uid() = user_id or auth.jwt()->>'email' = 'pavankalyan.d@gmail.com');

-- 4. Policy: Students can create or update their own requests
drop policy if exists "Students can insert own enrollment requests" on public.enrollment_requests;
create policy "Students can insert own enrollment requests"
  on public.enrollment_requests for insert
  with check (auth.uid() = user_id);

drop policy if exists "Students and Admin can update requests" on public.enrollment_requests;
create policy "Students and Admin can update requests"
  on public.enrollment_requests for update
  using (auth.uid() = user_id or auth.jwt()->>'email' = 'pavankalyan.d@gmail.com');

-- 5. Policy: Admin can view all profiles and update any profile's enrolled_courses
drop policy if exists "Admin can view all profiles" on public.profiles;
create policy "Admin can view all profiles"
  on public.profiles for select
  using (auth.uid() = id or auth.jwt()->>'email' = 'pavankalyan.d@gmail.com');

drop policy if exists "Admin can update all profiles" on public.profiles;
create policy "Admin can update all profiles"
  on public.profiles for update
  using (auth.uid() = id or auth.jwt()->>'email' = 'pavankalyan.d@gmail.com');

-- 6. Ensure pavankalyan.d@gmail.com is set to 'admin' role in profiles
update public.profiles
set role = 'admin'
where email = 'pavankalyan.d@gmail.com';
