import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  InstagramCategory,
  InstagramPostDraft,
  PlannerDay,
  PostStatus,
  SevenDayPlan,
} from '../types/instagramCreator';
import {
  INSTAGRAM_TOPIC_BANK,
  PreCuratedTopicTemplate,
} from '../data/instagramTopicBank';

const LOCAL_STORAGE_KEY = 'rootaccess_instagram_drafts_v1';
const LOCAL_STORAGE_PLANS_KEY = 'rootaccess_instagram_7day_plans_v1';

function getLocalDrafts(): InstagramPostDraft[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDrafts(drafts: InstagramPostDraft[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drafts));
  } catch (err) {
    console.error('Failed to save local instagram drafts:', err);
  }
}

export const instagramCreatorService = {
  /**
   * Retrieves all drafts and posts from Supabase or localStorage fallback.
   */
  async getAllDrafts(): Promise<InstagramPostDraft[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('instagram_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && Array.isArray(data)) {
          // Map DB snake_case columns to TypeScript camelCase object
          const mapped: InstagramPostDraft[] = data.map((row) => ({
            id: row.id,
            topicTitle: row.topic_title,
            category: row.category as InstagramCategory,
            targetAudience: row.target_audience,
            difficultyLevel: row.difficulty_level,
            learningObjective: row.learning_objective,
            whyUseful: row.why_useful,
            recommendedFormat: row.recommended_format,
            status: row.status as PostStatus,
            plannedDate: row.planned_date,
            publishedDate: row.published_date,
            postUrl: row.post_url,
            reel: {
              hook: row.reel_hook,
              hookRationale: row.reel_hook_rationale,
              durationSeconds: row.reel_duration_seconds,
              script: row.reel_script,
              visualDirections: row.reel_visual_directions,
              onScreenText: row.reel_on_screen_text,
              codeSnippet: row.reel_code_snippet,
              transitions: row.reel_transitions,
              closingCta: row.reel_closing_cta,
              coverTitle: row.reel_cover_title,
            },
            carousel: {
              headline: row.carousel_headline,
              slides: row.carousel_slides || [],
              designGuidance: row.carousel_design_guidance,
            },
            caption: {
              captionText: row.caption,
              hashtags: row.hashtags || [],
              engagementQuestion: row.engagement_question,
              searchKeywords: row.keywords || [],
              callToAction: row.call_to_action,
            },
            research: {
              verifiedFacts: row.verified_facts || [],
              officialDocSources: row.official_doc_sources || [],
              unverifiedClaimsNotice: row.unverified_claims_notice,
              isEvergreen: row.is_evergreen ?? true,
            },
            generationSource: row.generation_source || 'curated_engine',
            adminNotes: row.admin_notes,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by,
          }));

          // Synchronize local backup
          saveLocalDrafts(mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase query failed, using localStorage fallback:', err);
      }
    }

    return getLocalDrafts();
  },

  /**
   * Retrieves a single draft by ID.
   */
  async getDraftById(id: string): Promise<InstagramPostDraft | null> {
    const drafts = await this.getAllDrafts();
    return drafts.find((d) => d.id === id) || null;
  },

  /**
   * Saves a new draft or updates an existing draft.
   */
  async saveDraft(draft: InstagramPostDraft): Promise<{ success: boolean; draft: InstagramPostDraft; error?: string }> {
    const updatedDraft: InstagramPostDraft = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };

    // Save to local storage first for resilience
    const local = getLocalDrafts();
    const existingIndex = local.findIndex((d) => d.id === updatedDraft.id);
    if (existingIndex >= 0) {
      local[existingIndex] = updatedDraft;
    } else {
      local.unshift(updatedDraft);
    }
    saveLocalDrafts(local);

    // Save to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: updatedDraft.id,
          topic_title: updatedDraft.topicTitle,
          category: updatedDraft.category,
          target_audience: updatedDraft.targetAudience,
          difficulty_level: updatedDraft.difficultyLevel,
          learning_objective: updatedDraft.learningObjective,
          why_useful: updatedDraft.whyUseful,
          recommended_format: updatedDraft.recommendedFormat,
          status: updatedDraft.status,
          planned_date: updatedDraft.plannedDate || null,
          published_date: updatedDraft.publishedDate || null,
          post_url: updatedDraft.postUrl || '',
          reel_hook: updatedDraft.reel.hook,
          reel_hook_rationale: updatedDraft.reel.hookRationale,
          reel_duration_seconds: updatedDraft.reel.durationSeconds,
          reel_script: updatedDraft.reel.script,
          reel_visual_directions: updatedDraft.reel.visualDirections,
          reel_on_screen_text: updatedDraft.reel.onScreenText,
          reel_code_snippet: updatedDraft.reel.codeSnippet || '',
          reel_transitions: updatedDraft.reel.transitions,
          reel_closing_cta: updatedDraft.reel.closingCta,
          reel_cover_title: updatedDraft.reel.coverTitle,
          carousel_headline: updatedDraft.carousel.headline,
          carousel_slides: updatedDraft.carousel.slides,
          carousel_design_guidance: updatedDraft.carousel.designGuidance,
          caption: updatedDraft.caption.captionText,
          hashtags: updatedDraft.caption.hashtags,
          engagement_question: updatedDraft.caption.engagementQuestion,
          keywords: updatedDraft.caption.searchKeywords,
          call_to_action: updatedDraft.caption.callToAction,
          verified_facts: updatedDraft.research.verifiedFacts,
          official_doc_sources: updatedDraft.research.officialDocSources,
          unverified_claims_notice: updatedDraft.research.unverifiedClaimsNotice || '',
          is_evergreen: updatedDraft.research.isEvergreen,
          generation_source: updatedDraft.generationSource,
          admin_notes: updatedDraft.adminNotes || '',
          updated_at: updatedDraft.updatedAt,
        };

        const { error } = await supabase.from('instagram_posts').upsert(payload);
        if (error) {
          console.warn('Supabase upsert warning:', error.message);
        }
      } catch (err: any) {
        console.warn('Failed to upsert to Supabase:', err);
      }
    }

    return { success: true, draft: updatedDraft };
  },

  /**
   * Deletes a draft by ID.
   */
  async deleteDraft(id: string): Promise<boolean> {
    const local = getLocalDrafts().filter((d) => d.id !== id);
    saveLocalDrafts(local);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('instagram_posts').delete().eq('id', id);
      } catch (err) {
        console.warn('Error deleting from Supabase:', err);
      }
    }
    return true;
  },

  /**
   * Duplicates a draft so an administrator can iterate on a new variation.
   */
  async duplicateDraft(id: string): Promise<InstagramPostDraft | null> {
    const original = await this.getDraftById(id);
    if (!original) return null;

    const copy: InstagramPostDraft = {
      ...JSON.parse(JSON.stringify(original)),
      id: `ig-draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      topicTitle: `${original.topicTitle} (Copy)`,
      status: 'draft',
      plannedDate: undefined,
      publishedDate: undefined,
      postUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.saveDraft(copy);
    return copy;
  },

  /**
   * Updates the publishing status of a draft.
   */
  async updateStatus(
    id: string,
    status: PostStatus,
    publishedDate?: string,
    postUrl?: string
  ): Promise<InstagramPostDraft | null> {
    const draft = await this.getDraftById(id);
    if (!draft) return null;

    draft.status = status;
    if (status === 'published') {
      draft.publishedDate = publishedDate || new Date().toISOString().split('T')[0];
      if (postUrl) draft.postUrl = postUrl;
    }

    await this.saveDraft(draft);
    return draft;
  },

  /**
   * Anti-Repetition Logic (30-day window):
   * Inspects recently used topics to recommend a fresh topic from the 10 categories.
   */
  async getRecommendedTopic(options?: {
    forceRegenerate?: boolean;
    skipTopicId?: string;
    preferredCategory?: InstagramCategory;
  }): Promise<PreCuratedTopicTemplate> {
    const drafts = await this.getAllDrafts();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Identify topics used or created in the past 30 days
    const recentTopicTitles = new Set(
      drafts
        .filter((d) => d.createdAt >= thirtyDaysAgo || (d.publishedDate && d.publishedDate >= thirtyDaysAgo.split('T')[0]))
        .map((d) => d.topicTitle.toLowerCase().trim())
    );

    let candidates = INSTAGRAM_TOPIC_BANK;

    // Filter by preferred category if requested
    if (options?.preferredCategory) {
      const categoryMatches = candidates.filter((t) => t.category === options.preferredCategory);
      if (categoryMatches.length > 0) {
        candidates = categoryMatches;
      }
    }

    // Exclude current topic if regenerating
    if (options?.skipTopicId) {
      candidates = candidates.filter((t) => t.id !== options.skipTopicId);
    }

    // Filter out topics used in the last 30 days
    const freshCandidates = candidates.filter(
      (t) => !recentTopicTitles.has(t.topicTitle.toLowerCase().trim())
    );

    const selectionPool = freshCandidates.length > 0 ? freshCandidates : candidates;

    if (options?.forceRegenerate) {
      // Pick a random alternative from the pool
      const randomIndex = Math.floor(Math.random() * selectionPool.length);
      return selectionPool[randomIndex] || INSTAGRAM_TOPIC_BANK[0];
    }

    // Deterministic daily rotation based on day of the year
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const selected = selectionPool[dayOfYear % selectionPool.length];
    return selected || INSTAGRAM_TOPIC_BANK[0];
  },

  /**
   * Assembles a complete, ready-to-copy content package for a selected topic template.
   */
  createDraftFromTemplate(template: PreCuratedTopicTemplate, plannedDate?: string): InstagramPostDraft {
    const now = new Date().toISOString();
    return {
      id: `ig-post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      topicTitle: template.topicTitle,
      category: template.category,
      targetAudience: template.targetAudience,
      difficultyLevel: template.difficultyLevel,
      learningObjective: template.learningObjective,
      whyUseful: template.whyUseful,
      recommendedFormat: template.recommendedFormat,
      status: 'draft',
      plannedDate: plannedDate || now.split('T')[0],
      reel: { ...template.reel },
      carousel: { ...template.carousel },
      caption: { ...template.caption },
      research: { ...template.research },
      generationSource: 'curated_engine',
      createdAt: now,
      updatedAt: now,
      createdBy: 'admin',
    };
  },

  /**
   * Regenerates an individual section of a draft without touching the rest.
   */
  regenerateSection(
    draft: InstagramPostDraft,
    section: 'hook' | 'script' | 'carousel' | 'caption' | 'engagement'
  ): InstagramPostDraft {
    const updated: InstagramPostDraft = JSON.parse(JSON.stringify(draft));

    // Alternative variations based on category
    if (section === 'hook') {
      const hooks = [
        `Stop making this critical mistake in ${draft.category.split(' ')[0]} testing!`,
        `The single concept that separates junior testers from senior QA leads:`,
        `Why your automated tests are passing falsely (and what to do about it):`,
        `Here is why senior QA engineers NEVER test this way:`,
        `A quick 30-second masterclass on ${draft.topicTitle}:`,
      ];
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      updated.reel.hook = randomHook;
      updated.reel.hookRationale = 'Refreshed pattern-interrupt hook for higher initial 3-second retention.';
    } else if (section === 'script') {
      updated.reel.script = `[0:00 - 0:03] ${updated.reel.hook}\n[0:03 - 0:11] Here is the core problem: most QA engineers overlook this edge behavior during sprint verification.\n[0:11 - 0:20] When you examine the actual technical mechanics, you realize why this causes intermittent production defects.\n[0:20 - 0:28] By applying this simple verification rule, you prevent silent data loss and false positives.\n[0:28 - 0:33] Learn practical software testing by doing on RootAccess. Link in bio!`;
      updated.reel.transitions = 'Dynamic zoom at 0:11, code overlay pop-up at 0:20.';
    } else if (section === 'carousel') {
      updated.carousel.slides = updated.carousel.slides.map((s, idx) => ({
        ...s,
        visualNote: idx === 0 ? 'High-contrast minimalist cover title' : 'Clean card with mono code syntax and red warning highlights',
      }));
    } else if (section === 'caption') {
      updated.caption.captionText = `Quick QA Engineering Tip 💡\n\n${draft.topicTitle}\n\nKey takeaways:\n• ${draft.learningObjective}\n• ${draft.whyUseful}\n\nSave this post for your next testing sprint! 📌\n\n👉 Learn by Doing on RootAccess. Link in bio!`;
    } else if (section === 'engagement') {
      const questions = [
        'Have you ever encountered this defect in your current project? Drop your experience below! 👇',
        'Which testing approach does your team currently use for this? Let us know! 💬',
        'Tag a tester friend who needs to see this! 👥',
        'What is your #1 rule of thumb when testing this scenario? Share below! 🚀',
      ];
      updated.caption.engagementQuestion = questions[Math.floor(Math.random() * questions.length)];
    }

    updated.updatedAt = new Date().toISOString();
    return updated;
  },

  /**
   * Generates a balanced 7-Day Content Plan across diverse categories.
   */
  async generateSevenDayPlan(startDateStr?: string): Promise<SevenDayPlan> {
    const start = startDateStr ? new Date(startDateStr) : new Date();
    const drafts = await this.getAllDrafts();
    const recentTopicTitles = new Set(drafts.map((d) => d.topicTitle.toLowerCase().trim()));

    // Balanced weekly pattern representing RootAccess tracks:
    // Day 1: SQL
    // Day 2: Manual Testing
    // Day 3: API Testing
    // Day 4: Playwright
    // Day 5: QA Interview
    // Day 6: Real-World Scenario
    // Day 7: AI Testing or Framework Practice
    const plannedCategories: { category: InstagramCategory; format: 'Reel' | 'Carousel' }[] = [
      { category: 'SQL for beginners and QA testers', format: 'Reel' },
      { category: 'Manual Testing and test case design', format: 'Carousel' },
      { category: 'API Testing with Postman', format: 'Reel' },
      { category: 'Playwright Automation with JavaScript', format: 'Reel' },
      { category: 'Software Testing interview questions', format: 'Carousel' },
      { category: 'Real-world QA scenarios and debugging', format: 'Carousel' },
      { category: 'AI-assisted software testing', format: 'Reel' },
    ];

    const days: PlannerDay[] = [];

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(start);
      dateObj.setDate(start.getDate() + i);
      const dateStr = dateObj.toISOString().split('T')[0];
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

      const catConfig = plannedCategories[i % plannedCategories.length];
      const candidates = INSTAGRAM_TOPIC_BANK.filter((t) => t.category === catConfig.category);

      // Select candidate not recently used if possible
      const fresh = candidates.find((c) => !recentTopicTitles.has(c.topicTitle.toLowerCase().trim()));
      const selected = fresh || candidates[0] || INSTAGRAM_TOPIC_BANK[0];

      // Check if a draft is already saved for this date
      const alreadyScheduled = drafts.some((d) => d.plannedDate === dateStr);

      days.push({
        dayNumber: i + 1,
        date: dateStr,
        dayOfWeek: dayName,
        category: selected.category,
        recommendedFormat: catConfig.format,
        topicTitle: selected.topicTitle,
        hook: selected.reel.hook,
        learningObjective: selected.learningObjective,
        alreadyGenerated: alreadyScheduled,
      });
    }

    const plan: SevenDayPlan = {
      id: `plan-${Date.now()}`,
      startDate: days[0].date,
      endDate: days[days.length - 1].date,
      days,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_PLANS_KEY, JSON.stringify(plan));
    } catch {
      // ignore
    }

    return plan;
  },

  /**
   * Retrieves list of topics used within the last 30 days.
   */
  async getRecentlyUsedTopics(daysLimit: number = 30): Promise<{
    id: string;
    topicTitle: string;
    category: InstagramCategory;
    status: PostStatus;
    date: string;
    format: string;
  }[]> {
    const drafts = await this.getAllDrafts();
    const cutoff = new Date(Date.now() - daysLimit * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return drafts
      .filter((d) => (d.plannedDate && d.plannedDate >= cutoff) || d.createdAt.split('T')[0] >= cutoff)
      .map((d) => ({
        id: d.id,
        topicTitle: d.topicTitle,
        category: d.category,
        status: d.status,
        date: d.publishedDate || d.plannedDate || d.createdAt.split('T')[0],
        format: d.recommendedFormat,
      }));
  },
};
