-- ==============================================================================
-- RootAccess Complete Master Database Schema
-- Compatible with Supabase PostgreSQL
-- ==============================================================================
-- INSTRUCTIONS:
-- 1. Log into your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Open your project (or create a new free project)
-- 3. Click "SQL Editor" in the left sidebar navigation
-- 4. Click "+ New query", paste this entire script, and click "Run" (Cmd+Enter / Ctrl+Enter)
-- 5. Copy your Project URL & Anon Public Key from Project Settings -> API
--    and paste them into your root `.env` file:
--      VITE_SUPABASE_URL=https://your-project.supabase.co
--      VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
-- ==============================================================================

-- 1. Enable Required Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- TABLE 1: User Profiles (Synced from auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  email text not null,
  role text default 'student' not null check (role in ('student', 'instructor', 'admin')),
  enrolled_courses text[] default array['manual-qa-fundamentals']::text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Trigger: Automatically populate public.profiles whenever a user registers in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, enrolled_courses)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'RootAccess Student'),
    coalesce(new.email, ''),
    'student',
    array['manual-qa-fundamentals']::text[]
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = coalesce(excluded.email, public.profiles.email),
    updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- TABLE 2: Manual QA Progress & Submissions
-- ==============================================================================
create table if not exists public.manual_qa_day_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 5),
  status text not null check (status in ('locked', 'available', 'in_progress', 'awaiting_review', 'failed', 'completed')),
  content_completed boolean default false not null,
  practical_completed boolean default false not null,
  checkpoint_score int default 0 not null,
  checkpoint_passed boolean default false not null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, day_number)
);

create table if not exists public.manual_qa_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 5),
  submission_type text not null check (submission_type in ('test_scenarios', 'test_cases', 'defect_reports', 'agile_workflow', 'final_project')),
  content jsonb not null,
  rubric_evaluation jsonb not null,
  score int not null default 0,
  passed boolean not null default false,
  feedback text not null default '',
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.manual_qa_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  assessment_type text not null check (assessment_type in ('day_1_checkpoint', 'day_2_checkpoint', 'day_3_checkpoint', 'surprise_test_1', 'day_4_checkpoint', 'final_surprise_assessment')),
  score int not null,
  total_questions int not null,
  percentage int not null,
  passed boolean not null,
  question_ids jsonb not null,
  answers jsonb not null,
  feedback jsonb,
  attempted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.manual_qa_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  certificate_id text not null unique,
  overall_score_percentage int not null,
  surprise_test_1_score int not null,
  final_assessment_score int not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Manual QA
alter table public.manual_qa_day_progress enable row level security;
alter table public.manual_qa_submissions enable row level security;
alter table public.manual_qa_attempts enable row level security;
alter table public.manual_qa_completions enable row level security;

-- Policies for Manual QA
drop policy if exists "Users can manage own manual qa progress" on public.manual_qa_day_progress;
create policy "Users can manage own manual qa progress"
  on public.manual_qa_day_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own manual qa submissions" on public.manual_qa_submissions;
create policy "Users can manage own manual qa submissions"
  on public.manual_qa_submissions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own manual qa attempts" on public.manual_qa_attempts;
create policy "Users can manage own manual qa attempts"
  on public.manual_qa_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can view own completions" on public.manual_qa_completions;
create policy "Users can view own completions"
  on public.manual_qa_completions for select
  using (auth.uid() = user_id);

-- ==============================================================================
-- TABLE 3: DevOps Academy Progress & Submissions
-- ==============================================================================
create table if not exists public.devops_day_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 36),
  topics_read jsonb default '[]'::jsonb not null,
  activities_completed jsonb default '{}'::jsonb not null,
  checkpoints_passed jsonb default '[]'::jsonb not null,
  assignment_submitted boolean default false not null,
  assignment_score int default 0 not null,
  quiz_submitted boolean default false not null,
  quiz_score int default 0 not null,
  quiz_passed boolean default false not null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, day_number)
);

create table if not exists public.devops_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 36),
  submission_type text not null check (submission_type in ('delivery_workflow', 'terminal_setup', 'incident_report', 'capstone_pipeline')),
  content jsonb not null,
  rubric_evaluation jsonb not null,
  score int not null default 0,
  passed boolean not null default false,
  feedback text not null default '',
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.devops_quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 36),
  score int not null,
  total_questions int not null,
  percentage int not null,
  passed boolean not null,
  answers jsonb not null,
  attempted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for DevOps
alter table public.devops_day_progress enable row level security;
alter table public.devops_submissions enable row level security;
alter table public.devops_quiz_attempts enable row level security;

-- Policies for DevOps
drop policy if exists "Users can manage own devops progress" on public.devops_day_progress;
create policy "Users can manage own devops progress"
  on public.devops_day_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own devops submissions" on public.devops_submissions;
create policy "Users can manage own devops submissions"
  on public.devops_submissions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own devops quiz attempts" on public.devops_quiz_attempts;
create policy "Users can manage own devops quiz attempts"
  on public.devops_quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ==============================================================================
-- Schema setup complete!
-- ==============================================================================
