export type InstagramCategory =
  | 'SQL for beginners and QA testers'
  | 'Manual Testing and test case design'
  | 'API Testing with Postman'
  | 'Playwright Automation with JavaScript'
  | 'JavaScript fundamentals for testers'
  | 'Software Testing interview questions'
  | 'Real-world QA scenarios and debugging'
  | 'Common mistakes made by beginners'
  | 'Automation framework best practices'
  | 'AI-assisted software testing';

export type ContentFormat = 'Reel' | 'Carousel' | 'Single-image post' | 'Story';

export type PostStatus = 'draft' | 'ready' | 'published';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CarouselSlide {
  slideNumber: number;
  slideType: 'hook' | 'content' | 'code' | 'summary' | 'cta';
  headline: string;
  bodyText: string;
  codeSnippet?: string;
  visualNote: string;
}

export interface InstagramReelPackage {
  hook: string; // 1-3 seconds hook
  hookRationale: string;
  durationSeconds: number; // 20-40s
  script: string; // Spoken dialogue with timestamps
  visualDirections: string; // Camera, actor, screen recording directions
  onScreenText: string; // Text overlays
  codeSnippet?: string;
  transitions: string; // Cut, zoom, whip pan
  closingCta: string; // RootAccess CTA
  coverTitle: string; // Suggested cover headline
}

export interface InstagramCarouselPackage {
  headline: string;
  slides: CarouselSlide[];
  designGuidance: string;
}

export interface InstagramCaptionPackage {
  captionText: string;
  hashtags: string[];
  engagementQuestion: string;
  searchKeywords: string[];
  callToAction: string;
}

export interface TechnicalResearchMetadata {
  verifiedFacts: string[];
  officialDocSources: {
    title: string;
    url: string;
    dateChecked: string;
    versionContext?: string;
  }[];
  unverifiedClaimsNotice?: string;
  isEvergreen: boolean;
}

export type ImageTemplateStyle =
  | 'code_terminal'
  | 'mistake_vs_fix'
  | 'cheat_sheet'
  | 'interview_quiz'
  | 'bold_hook';

export type ImageAspectRatio = '1:1' | '4:5' | '9:16';

export type ImageTheme = 'rootaccess_dark' | 'obsidian' | 'cyber_terminal' | 'clean_light';

export interface InstagramImagePostPackage {
  headline: string;
  subtitle: string;
  categoryTag: string;
  templateStyle: ImageTemplateStyle;
  aspectRatio: ImageAspectRatio;
  theme: ImageTheme;
  codeSnippet?: string;
  badSnippet?: string;
  goodSnippet?: string;
  bulletPoints?: string[];
  explanation?: string;
  quizQuestion?: string;
  quizOptions?: { label: string; text: string; isCorrect?: boolean }[];
  callToAction: string;
  aiImagePrompt?: string;
}

export interface InstagramPostDraft {
  id: string;
  topicTitle: string;
  category: InstagramCategory;
  targetAudience: string;
  difficultyLevel: DifficultyLevel;
  learningObjective: string;
  whyUseful: string;
  recommendedFormat: ContentFormat;
  status: PostStatus;
  plannedDate?: string; // YYYY-MM-DD
  publishedDate?: string; // YYYY-MM-DD
  postUrl?: string; // e.g. https://instagram.com/p/...

  // Complete Content Package
  imagePost?: InstagramImagePostPackage;
  reel: InstagramReelPackage;
  carousel: InstagramCarouselPackage;
  caption: InstagramCaptionPackage;
  research: TechnicalResearchMetadata;

  // Metadata
  generationSource: 'curated_engine' | 'gemini_ai' | 'openai_ai';
  adminNotes?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  createdBy?: string;
}

export interface PlannerDay {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Monday, Tuesday...
  category: InstagramCategory;
  recommendedFormat: ContentFormat;
  topicTitle: string;
  hook: string;
  learningObjective: string;
  alreadyGenerated?: boolean;
}

export interface SevenDayPlan {
  id: string;
  startDate: string;
  endDate: string;
  days: PlannerDay[];
  createdAt: string;
}

export interface AiSettings {
  provider: 'none' | 'gemini' | 'openai';
  apiKey?: string;
  modelName?: string;
  temperature?: number;
  isConfigured: boolean;
}
