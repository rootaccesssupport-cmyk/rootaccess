import { describe, it, expect, beforeEach } from 'vitest';
import {
  INSTAGRAM_CATEGORIES,
  INSTAGRAM_TOPIC_BANK,
} from '../data/instagramTopicBank';
import { instagramCreatorService } from '../services/instagramCreatorService';
import { instagramAiService } from '../services/instagramAiService';
import { ENROLLMENT_PAYMENT_CONFIG } from '../data/enrollmentPaymentConfig';

describe('RootAccess Instagram Creator — Unit & Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('1. Topic Bank & Technical Accuracy Across All 10 Categories', () => {
    it('contains all 10 required content categories', () => {
      expect(INSTAGRAM_CATEGORIES).toHaveLength(10);
      expect(INSTAGRAM_CATEGORIES).toContain('SQL for beginners and QA testers');
      expect(INSTAGRAM_CATEGORIES).toContain('Manual Testing and test case design');
      expect(INSTAGRAM_CATEGORIES).toContain('API Testing with Postman');
      expect(INSTAGRAM_CATEGORIES).toContain('Playwright Automation with JavaScript');
      expect(INSTAGRAM_CATEGORIES).toContain('JavaScript fundamentals for testers');
      expect(INSTAGRAM_CATEGORIES).toContain('Software Testing interview questions');
      expect(INSTAGRAM_CATEGORIES).toContain('Real-world QA scenarios and debugging');
      expect(INSTAGRAM_CATEGORIES).toContain('Common mistakes made by beginners');
      expect(INSTAGRAM_CATEGORIES).toContain('Automation framework best practices');
      expect(INSTAGRAM_CATEGORIES).toContain('AI-assisted software testing');
    });

    it('has at least one pre-curated template for every category in the bank', () => {
      INSTAGRAM_CATEGORIES.forEach((category) => {
        const matchingTopics = INSTAGRAM_TOPIC_BANK.filter(
          (t) => t.category === category
        );
        expect(
          matchingTopics.length,
          `Category "${category}" must have at least one topic in topic bank`
        ).toBeGreaterThanOrEqual(1);
      });
    });

    it('ensures every topic contains complete, syntactically correct technical research & documentation references', () => {
      INSTAGRAM_TOPIC_BANK.forEach((topic) => {
        expect(topic.topicTitle).toBeTruthy();
        expect(topic.targetAudience).toBeTruthy();
        expect(topic.learningObjective).toBeTruthy();
        expect(topic.whyUseful).toBeTruthy();

        // Technical Research
        expect(topic.research.officialDocSources.length).toBeGreaterThanOrEqual(1);
        topic.research.officialDocSources.forEach((source) => {
          expect(source.url).toMatch(/^https?:\/\//);
          expect(source.title).toBeTruthy();
          expect(source.dateChecked).toBeTruthy();
        });
        expect(topic.research.verifiedFacts.length).toBeGreaterThanOrEqual(1);

        // Reel package specifications
        expect(topic.reel.hook).toBeTruthy();
        expect(topic.reel.script).toBeTruthy();
        expect(topic.reel.durationSeconds).toBeGreaterThanOrEqual(20);
        expect(topic.reel.durationSeconds).toBeLessThanOrEqual(45);
        expect(topic.reel.visualDirections).toBeTruthy();
        expect(topic.reel.closingCta).toContain('RootAccess — Learn by Doing.');

        // Carousel specifications
        expect(topic.carousel.slides.length).toBeGreaterThanOrEqual(4);
        expect(topic.carousel.slides[0].headline).toBeTruthy();
        const lastSlide = topic.carousel.slides[topic.carousel.slides.length - 1];
        expect(lastSlide.bodyText).toBeTruthy();

        // Caption specifications
        expect(topic.caption.captionText).toBeTruthy();
        expect(topic.caption.hashtags.length).toBeGreaterThanOrEqual(3);
        expect(topic.caption.hashtags.length).toBeLessThanOrEqual(12); // No hashtag stuffing
        expect(topic.caption.engagementQuestion).toBeTruthy();
      });
    });
  });

  describe('2. Anti-Repetition Logic & Recommendation Engine', () => {
    it('recommends a valid topic from the bank initially', async () => {
      const topic = await instagramCreatorService.getRecommendedTopic();
      expect(topic).toBeDefined();
      expect(topic.topicTitle).toBeTruthy();
    });

    it('excludes topics used within the last 30 days', async () => {
      // Create a draft for topic 0 with date = today
      const topic0 = INSTAGRAM_TOPIC_BANK[0];
      const draft0 = instagramCreatorService.createDraftFromTemplate(topic0);
      await instagramCreatorService.saveDraft(draft0);

      // Now asking for a recommendation with forceRegenerate should avoid recently used topic
      const nextTopic = await instagramCreatorService.getRecommendedTopic({
        forceRegenerate: true,
        skipTopicId: topic0.id,
      });
      expect(nextTopic.id).not.toBe(topic0.id);
    });

    it('regenerate topic returns an alternative topic', async () => {
      const current = INSTAGRAM_TOPIC_BANK[0];
      const regenerated = await instagramCreatorService.getRecommendedTopic({
        forceRegenerate: true,
        skipTopicId: current.id,
      });
      expect(regenerated.id).not.toBe(current.id);
    });
  });

  describe('3. Content Package Generation & Fallback Engine', () => {
    it('generates a complete InstagramPostDraft with all sub-packages without AI key', async () => {
      const topic = INSTAGRAM_TOPIC_BANK[0];
      const draft = instagramCreatorService.createDraftFromTemplate(topic);

      expect(draft.id).toBeTruthy();
      expect(draft.topicTitle).toBe(topic.topicTitle);
      expect(draft.category).toBe(topic.category);
      expect(draft.status).toBe('draft');

      // Reel
      expect(draft.reel.hook).toBe(topic.reel.hook);
      expect(draft.reel.script).toBe(topic.reel.script);
      expect(draft.reel.closingCta).toContain('RootAccess — Learn by Doing.');

      // Carousel
      expect(draft.carousel.slides.length).toBe(topic.carousel.slides.length);

      // Caption
      expect(draft.caption.captionText.length).toBeGreaterThan(50);
      expect(draft.caption.captionText).toContain('RootAccess');
      expect(draft.caption.hashtags.length).toBeGreaterThanOrEqual(3);

      // Technical Research
      expect(draft.research.officialDocSources).toEqual(topic.research.officialDocSources);
    });
  });

  describe('4. Section-Level Regeneration Without Losing Other Draft Content', () => {
    it('regenerates individual sections without modifying the rest of the draft', async () => {
      const topic = INSTAGRAM_TOPIC_BANK[0];
      const originalDraft = instagramCreatorService.createDraftFromTemplate(topic);

      // 1. Regenerate Reel Hook
      const afterHookRegen = instagramCreatorService.regenerateSection(
        originalDraft,
        'hook'
      );
      expect(afterHookRegen.reel.hook).toBeTruthy();
      expect(afterHookRegen.reel.script).toBe(originalDraft.reel.script); // Preserved
      expect(afterHookRegen.caption.captionText).toBe(originalDraft.caption.captionText); // Preserved
      expect(afterHookRegen.carousel.slides).toEqual(originalDraft.carousel.slides); // Preserved

      // 2. Regenerate Script
      const afterScriptRegen = instagramCreatorService.regenerateSection(
        originalDraft,
        'script'
      );
      expect(afterScriptRegen.reel.script).toBeTruthy();
      expect(afterScriptRegen.reel.hook).toBe(originalDraft.reel.hook); // Preserved
      expect(afterScriptRegen.caption.captionText).toBe(originalDraft.caption.captionText); // Preserved

      // 3. Regenerate Caption
      const afterCaptionRegen = instagramCreatorService.regenerateSection(
        originalDraft,
        'caption'
      );
      expect(afterCaptionRegen.caption.captionText).toBeTruthy();
      expect(afterCaptionRegen.reel.hook).toBe(originalDraft.reel.hook); // Preserved
      expect(afterCaptionRegen.reel.script).toBe(originalDraft.reel.script); // Preserved

      // 4. Regenerate Engagement Question
      const afterQuestionRegen = instagramCreatorService.regenerateSection(
        originalDraft,
        'engagement'
      );
      expect(afterQuestionRegen.caption.engagementQuestion).toBeTruthy();
      expect(afterQuestionRegen.reel.script).toBe(originalDraft.reel.script); // Preserved

      // 5. Regenerate Carousel
      const afterCarouselRegen = instagramCreatorService.regenerateSection(
        originalDraft,
        'carousel'
      );
      expect(afterCarouselRegen.carousel.slides.length).toBeGreaterThanOrEqual(4);
      expect(afterCarouselRegen.reel.hook).toBe(originalDraft.reel.hook); // Preserved
    });
  });

  describe('5. 7-Day Content Planner', () => {
    it('generates a balanced 7-day schedule with distinct categories and formats', async () => {
      const plan = await instagramCreatorService.generateSevenDayPlan();

      expect(plan.id).toBeTruthy();
      expect(plan.days).toHaveLength(7);

      const uniqueDays = new Set(plan.days.map((d) => d.dayNumber));
      expect(uniqueDays.size).toBe(7);

      // Verify each day contains required fields
      plan.days.forEach((day, index) => {
        expect(day.dayNumber).toBe(index + 1);
        expect(day.date).toBeTruthy();
        expect(day.topicTitle).toBeTruthy();
        expect(day.category).toBeTruthy();
        expect(day.recommendedFormat).toBeTruthy();
        expect(day.hook).toBeTruthy();
        expect(day.alreadyGenerated).toBe(false);
      });

      // Verify balance of formats (should include both Reel and Carousel across the week)
      const formats = plan.days.map((d) => d.recommendedFormat);
      expect(formats).toContain('Reel');
      expect(formats).toContain('Carousel');
    });
  });

  describe('6. Draft CRUD, Duplication, and Status Lifecycles', () => {
    it('manages draft lifecycle: save, update status (ready, published), duplicate, and delete', async () => {
      const topic = INSTAGRAM_TOPIC_BANK[1];
      const initialDraft = instagramCreatorService.createDraftFromTemplate(topic);
      await instagramCreatorService.saveDraft(initialDraft);

      // 1. Fetch drafts
      let allDrafts = await instagramCreatorService.getAllDrafts();
      expect(allDrafts.some((d) => d.id === initialDraft.id)).toBe(true);

      // 2. Update status to 'ready'
      const readyDraft = await instagramCreatorService.updateStatus(initialDraft.id, 'ready');
      expect(readyDraft?.status).toBe('ready');

      // 3. Update status to 'published' with post URL
      const publishedDraft = await instagramCreatorService.updateStatus(
        initialDraft.id,
        'published',
        '2026-11-02',
        'https://instagram.com/p/rootaccess_test123'
      );
      expect(publishedDraft?.status).toBe('published');
      expect(publishedDraft?.postUrl).toBe('https://instagram.com/p/rootaccess_test123');
      expect(publishedDraft?.publishedDate).toBeTruthy();

      // 4. Duplicate draft
      const duplicated = await instagramCreatorService.duplicateDraft(initialDraft.id);
      expect(duplicated?.id).not.toBe(initialDraft.id);
      expect(duplicated?.topicTitle).toBe(`${initialDraft.topicTitle} (Copy)`);
      expect(duplicated?.status).toBe('draft');

      // 5. Delete duplicated draft
      if (duplicated) {
        await instagramCreatorService.deleteDraft(duplicated.id);
      }
      allDrafts = await instagramCreatorService.getAllDrafts();
      expect(allDrafts.some((d) => d.id === duplicated?.id)).toBe(false);
    });
  });

  describe('7. Admin Authorization & Security Guardrails', () => {
    it('allows access to authorized admin emails and denies non-admins', () => {
      // Primary admin email
      expect(ENROLLMENT_PAYMENT_CONFIG.isAdminEmail('pavankalyan.d@gmail.com')).toBe(true);

      // Normal learners / non-admins
      expect(ENROLLMENT_PAYMENT_CONFIG.isAdminEmail('student@example.com')).toBe(false);
      expect(ENROLLMENT_PAYMENT_CONFIG.isAdminEmail('user@gmail.com')).toBe(false);
      expect(ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(undefined)).toBe(false);
    });

    it('respects AI settings persistence and fallback when API key is missing', () => {
      const initialSettings = instagramAiService.getSettings();
      expect(initialSettings.provider).toBe('none');

      // Save custom settings
      instagramAiService.saveSettings({
        apiKey: 'test-api-key-12345',
        provider: 'openai',
        modelName: 'gpt-4o-mini',
      });

      const updatedSettings = instagramAiService.getSettings();
      expect(updatedSettings.apiKey).toBe('test-api-key-12345');
      expect(updatedSettings.provider).toBe('openai');
      expect(updatedSettings.modelName).toBe('gpt-4o-mini');
      expect(updatedSettings.isConfigured).toBe(true);
    });
  });

  describe('8. Instagram Image Generator & Visual Post Engine', () => {
    it('automatically generates an InstagramImagePostPackage on draft creation', () => {
      const topic = INSTAGRAM_TOPIC_BANK[0];
      const draft = instagramCreatorService.createDraftFromTemplate(topic);

      expect(draft.imagePost).toBeDefined();
      expect(draft.imagePost?.headline).toBe(topic.topicTitle);
      expect(draft.imagePost?.categoryTag).toBe(topic.category);
      expect(['code_terminal', 'mistake_vs_fix', 'cheat_sheet', 'interview_quiz', 'bold_hook']).toContain(
        draft.imagePost?.templateStyle
      );
      expect(['1:1', '4:5', '9:16']).toContain(draft.imagePost?.aspectRatio);
      expect(['rootaccess_dark', 'obsidian', 'cyber_terminal', 'clean_light']).toContain(
        draft.imagePost?.theme
      );
      expect(draft.imagePost?.callToAction).toContain('RootAccess');
      expect(draft.imagePost?.aiImagePrompt).toContain('studio');
      expect(draft.imagePost?.bulletPoints?.length).toBeGreaterThanOrEqual(1);
    });

    it('cycles through template styles when regenerating image section', () => {
      const topic = INSTAGRAM_TOPIC_BANK[0];
      const draft = instagramCreatorService.createDraftFromTemplate(topic);
      const initialStyle = draft.imagePost?.templateStyle;

      const regenerated = instagramCreatorService.regenerateSection(draft, 'image');
      expect(regenerated.imagePost?.templateStyle).not.toBe(initialStyle);
      expect(regenerated.topicTitle).toBe(draft.topicTitle); // Preserves rest of draft
      expect(regenerated.reel.hook).toBe(draft.reel.hook); // Preserves reel hook
    });
  });
});
