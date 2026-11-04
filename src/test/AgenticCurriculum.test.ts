import { describe, it, expect } from 'vitest';
import {
  AGENTIC_DAYS_DATA,
  AGENTIC_AI_COURSE_METADATA,
} from '../data/agenticAiCurriculumData';
import { COURSES } from '../data/curriculumData';
import { ENROLLMENT_PAYMENT_CONFIG, getCoursePriceDetails } from '../data/enrollmentPaymentConfig';

describe('AI Agent Development Curriculum Data & Architecture', () => {
  it('contains course metadata with exact pricing and outcomes', () => {
    expect(AGENTIC_AI_COURSE_METADATA.courseSlug).toBe('ai-agent-development');
    expect(AGENTIC_AI_COURSE_METADATA.priceInr).toBe(299);
    expect(AGENTIC_AI_COURSE_METADATA.originalPriceInr).toBe(599);
    expect(AGENTIC_AI_COURSE_METADATA.category).toBe('Agentic AI');
    expect(AGENTIC_AI_COURSE_METADATA.outcomes.length).toBeGreaterThanOrEqual(5);
  });

  it('contains exactly 7 comprehensive days of curriculum', () => {
    expect(AGENTIC_DAYS_DATA).toHaveLength(7);

    AGENTIC_DAYS_DATA.forEach((day, idx) => {
      expect(day.dayNumber).toBe(idx + 1);
      expect(day.title).toBeDefined();
      expect(day.tagline).toBeDefined();
      expect(day.estimatedMinutes).toBeGreaterThanOrEqual(30);

      // Topics verification
      expect(day.topics.length).toBeGreaterThanOrEqual(3);
      day.topics.forEach((topic) => {
        expect(topic.title).toBeTruthy();
        expect(topic.summary).toBeTruthy();
        expect(topic.explanation.length).toBeGreaterThan(100);
        expect(topic.realWorldScenario).toBeTruthy();
        expect(topic.commonMistakes.length).toBeGreaterThanOrEqual(2);
        expect(topic.keyTakeaways.length).toBeGreaterThanOrEqual(2);
      });

      // Lab spec verification
      expect(day.lab.id).toBeDefined();
      expect(day.lab.instructions.length).toBeGreaterThanOrEqual(2);

      // Challenge verification
      expect(day.challenge.title).toBeTruthy();
      expect(day.challenge.starterCode).toBeTruthy();
      expect(day.challenge.verificationCriteria.length).toBeGreaterThanOrEqual(2);

      // Quiz verification: Exactly 5 questions per day, passing score 80%
      expect(day.quiz.passingScorePercent).toBe(80);
      expect(day.quiz.questions).toHaveLength(5);
      day.quiz.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswerIndex).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(10);
      });
    });
  });

  it('Day 7 includes the Capstone QA AI Assistant specifications', () => {
    const day7 = AGENTIC_DAYS_DATA[6];
    expect(day7.dayNumber).toBe(7);
    expect(day7.title).toContain('Final Project');
    expect(day7.lab.labType).toBe('qa_assistant_project');
  });

  it('is properly registered in COURSES catalog in curriculumData.ts', () => {
    const course = COURSES.find((c) => c.slug === 'ai-agent-development');
    expect(course).toBeDefined();
    expect(course?.title).toBe('AI Agent Development for Beginners');
    expect(course?.trackId).toBe('track-agentic-ai');
    expect(course?.lessons).toHaveLength(7);
    expect(course?.quiz?.questions).toHaveLength(5);
  });

  it('has exact launch pricing (₹299 / ₹599) in enrollmentPaymentConfig.ts', () => {
    const pricing = ENROLLMENT_PAYMENT_CONFIG.pricing['ai-agent-development'];
    expect(pricing).toBeDefined();
    expect(pricing.inr).toBe(299);
    expect(pricing.originalInr).toBe(599);
    expect(pricing.isLaunchOffer).toBe(true);

    const details = getCoursePriceDetails('ai-agent-development');
    expect(details.formattedInr).toBe('₹299');
    expect(details.formattedOriginalInr).toBe('₹599');
    expect(details.savings).toBe(300);
    expect(details.discountPercent).toBe(50);
  });
});
