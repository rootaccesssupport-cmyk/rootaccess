-- ==============================================================================
-- RootAccess Supabase Migration:
-- 1. Stop auto-enrolling Manual QA (default to 0 enrolled courses).
-- 2. Switch created_at and updated_at to Indian Standard Time (IST / Asia/Kolkata).
-- 3. Clean up existing profiles where manual-qa was added by default.
-- ==============================================================================

-- 1. Change the default of enrolled_courses to an empty array
alter table public.profiles 
  alter column enrolled_courses set default '{}'::text[];

-- 2. Change created_at and updated_at column defaults to Indian Standard Time (IST)
alter table public.profiles
  alter column created_at set default timezone('Asia/Kolkata'::text, now()),
  alter column updated_at set default timezone('Asia/Kolkata'::text, now());

-- 3. Replace the registration trigger so new students start with 0 enrolled courses & IST timestamps
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, enrolled_courses, created_at, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'RootAccess Student'),
    coalesce(new.email, ''),
    'student',
    '{}'::text[],
    timezone('Asia/Kolkata'::text, now()),
    timezone('Asia/Kolkata'::text, now())
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = coalesce(excluded.email, public.profiles.email),
    updated_at = timezone('Asia/Kolkata'::text, now());
  return new;
end;
$$;

-- 4. Clean up any existing student profiles that were auto-enrolled in manual QA mistakenly
update public.profiles
set 
  enrolled_courses = '{}'::text[],
  updated_at = timezone('Asia/Kolkata'::text, now())
where enrolled_courses = array['manual-qa-fundamentals']::text[];
