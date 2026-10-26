-- ==============================================================================
-- RootAccess Database Schema — DevOps Academy (36-Day Curriculum)
-- ==============================================================================
-- Run this script in the Supabase SQL Editor to support the DevOps Engineering course.

-- 1. Learner Day Progress Table
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

-- 2. Practical Submissions Table (Worksheets, Workflow Designs, Shell Command Logs, Incident Reports)
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

-- 3. Quiz Attempts Table
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

-- 4. Enable Row Level Security (RLS)
alter table public.devops_day_progress enable row level security;
alter table public.devops_submissions enable row level security;
alter table public.devops_quiz_attempts enable row level security;

-- 5. RLS Policies (Users can only read and write their own records)
create policy "Users can view their own devops day progress."
  on public.devops_day_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own devops day progress."
  on public.devops_day_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own devops day progress."
  on public.devops_day_progress for update
  using (auth.uid() = user_id);

create policy "Users can view their own devops submissions."
  on public.devops_submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own devops submissions."
  on public.devops_submissions for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own devops quiz attempts."
  on public.devops_quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own devops quiz attempts."
  on public.devops_quiz_attempts for insert
  with check (auth.uid() = user_id);
