-- ==============================================================================
-- RootAccess Database Schema — Manual QA in 5 Days Programme
-- ==============================================================================
-- Run this script in the Supabase SQL Editor to support the 5-Day Manual QA course.

-- 1. Learner Day Progress Table
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

-- 2. Practical Submissions Table (Worksheets, Test Cases, Defect Reports, Final Project)
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

-- 3. Assessment Attempts Table (Checkpoints, Surprise Test 1, Final Assessment)
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

-- 4. Course Completion Records
create table if not exists public.manual_qa_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  certificate_id text not null unique,
  overall_score_percentage int not null,
  surprise_test_1_score int not null,
  final_assessment_score int not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security (RLS) on all tables
alter table public.manual_qa_day_progress enable row level security;
alter table public.manual_qa_submissions enable row level security;
alter table public.manual_qa_attempts enable row level security;
alter table public.manual_qa_completions enable row level security;

-- 6. Define RLS Policies for manual_qa_day_progress
drop policy if exists "Users view own day progress" on public.manual_qa_day_progress;
create policy "Users view own day progress" on public.manual_qa_day_progress
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own day progress" on public.manual_qa_day_progress;
create policy "Users insert own day progress" on public.manual_qa_day_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users update own day progress" on public.manual_qa_day_progress;
create policy "Users update own day progress" on public.manual_qa_day_progress
  for update using (auth.uid() = user_id);

-- 7. Define RLS Policies for manual_qa_submissions
drop policy if exists "Users view own submissions" on public.manual_qa_submissions;
create policy "Users view own submissions" on public.manual_qa_submissions
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own submissions" on public.manual_qa_submissions;
create policy "Users insert own submissions" on public.manual_qa_submissions
  for insert with check (auth.uid() = user_id);

-- 8. Define RLS Policies for manual_qa_attempts
drop policy if exists "Users view own assessment attempts" on public.manual_qa_attempts;
create policy "Users view own assessment attempts" on public.manual_qa_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own assessment attempts" on public.manual_qa_attempts;
create policy "Users insert own assessment attempts" on public.manual_qa_attempts
  for insert with check (auth.uid() = user_id);

-- 9. Define RLS Policies for manual_qa_completions
drop policy if exists "Users view own completion record" on public.manual_qa_completions;
create policy "Users view own completion record" on public.manual_qa_completions
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own completion record" on public.manual_qa_completions;
create policy "Users insert own completion record" on public.manual_qa_completions
  for insert with check (auth.uid() = user_id);
