-- ==============================================================================
-- RootAccess: Instagram Creator Content & Drafts Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- ==============================================================================

-- 1. Create table for Instagram Posts & Content Packages
create table if not exists public.instagram_posts (
  id uuid default gen_random_uuid() primary key,
  topic_title text not null,
  category text not null,
  target_audience text not null default 'Software Testers and QA Engineers',
  difficulty_level text not null default 'Beginner' check (difficulty_level in ('Beginner', 'Intermediate', 'Advanced')),
  learning_objective text not null default '',
  why_useful text not null default '',
  recommended_format text not null default 'Reel' check (recommended_format in ('Reel', 'Carousel', 'Single-image post', 'Story')),
  status text not null default 'draft' check (status in ('draft', 'ready', 'published')),
  planned_date date,
  published_date date,
  post_url text default '',

  -- Reel Content Package
  reel_hook text not null default '',
  reel_hook_rationale text default '',
  reel_duration_seconds integer default 30,
  reel_script text not null default '',
  reel_visual_directions text not null default '',
  reel_on_screen_text text not null default '',
  reel_code_snippet text default '',
  reel_transitions text default '',
  reel_closing_cta text default '',
  reel_cover_title text default '',

  -- Carousel Content Package
  carousel_headline text not null default '',
  carousel_slides jsonb default '[]'::jsonb,
  carousel_design_guidance text default '',

  -- Caption & Discovery
  caption text not null default '',
  hashtags text[] default array[]::text[],
  engagement_question text default '',
  keywords text[] default array[]::text[],
  call_to_action text default '',

  -- Technical Research & Verification
  verified_facts text[] default array[]::text[],
  official_doc_sources jsonb default '[]'::jsonb,
  unverified_claims_notice text default '',
  is_evergreen boolean default true,

  -- Management & Provenance
  generation_source text default 'curated_engine' check (generation_source in ('curated_engine', 'gemini_ai', 'openai_ai')),
  admin_notes text default '',
  created_at timestamp with time zone default timezone('Asia/Kolkata'::text, now()) not null,
  updated_at timestamp with time zone default timezone('Asia/Kolkata'::text, now()) not null,
  created_by text default 'admin'
);

-- 2. Indexes for fast filtering
create index if not exists idx_instagram_posts_status on public.instagram_posts(status);
create index if not exists idx_instagram_posts_category on public.instagram_posts(category);
create index if not exists idx_instagram_posts_planned_date on public.instagram_posts(planned_date);
create index if not exists idx_instagram_posts_created_at on public.instagram_posts(created_at desc);

-- 3. Enable Row Level Security
alter table public.instagram_posts enable row level security;

-- 4. Policies: Admin Only Access (matching existing RootAccess admin policy pattern)
drop policy if exists "Admin full access to instagram_posts" on public.instagram_posts;
create policy "Admin full access to instagram_posts"
  on public.instagram_posts
  for all
  using (
    auth.jwt()->>'email' = 'pavankalyan.d@gmail.com' or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    auth.jwt()->>'email' = 'pavankalyan.d@gmail.com' or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 5. Updated_at Trigger
create or replace function public.update_instagram_posts_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('Asia/Kolkata'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_update_instagram_posts_timestamp on public.instagram_posts;
create trigger trg_update_instagram_posts_timestamp
  before update on public.instagram_posts
  for each row
  execute function public.update_instagram_posts_timestamp();
