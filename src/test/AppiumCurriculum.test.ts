import { describe, it, expect } from 'vitest';
import {
  APPIUM_DAYS_DATA,
  APPIUM_COURSE_METADATA,
} from '../data/appiumCurriculumData';
import { COURSES } from '../data/curriculumData';
import { ENROLLMENT_PAYMENT_CONFIG } from '../data/enrollmentPaymentConfig';

describe('Appium Mobile Automation Curriculum Dataset & Configuration', () => {
  it('1. Appium Course Metadata is valid and contains correct launch pricing', () => {
    expect(APPIUM_COURSE_METADATA.id).toBe('course-appium-mobile-automation');
    expect(APPIUM_COURSE_METADATA.slug).toBe('appium-mobile-automation');
    expect(APPIUM_COURSE_METADATA.title).toBe('Appium Mobile Automation with Java');
    expect(APPIUM_COURSE_METADATA.durationDays).toBe(14);
    expect(APPIUM_COURSE_METADATA.estimatedHours).toBe(18);
    expect(APPIUM_COURSE_METADATA.pricing.originalInr).toBe(999);
    expect(APPIUM_COURSE_METADATA.pricing.inr).toBe(499);
    expect(APPIUM_COURSE_METADATA.pricing.isLaunchOffer).toBe(true);
    expect(APPIUM_COURSE_METADATA.competencies.length).toBe(10);
  });

  it('2. Exactly 14 daily curriculum modules exist with sequential numbering', () => {
    expect(APPIUM_DAYS_DATA.length).toBe(14);
    APPIUM_DAYS_DATA.forEach((day, idx) => {
      expect(day.dayNumber).toBe(idx + 1);
      expect(day.slug).toBe(`day-${idx + 1}`);
      expect(day.title).toBeDefined();
      expect(day.subtitle).toBeDefined();
      expect(day.objectives.length).toBeGreaterThanOrEqual(3);
      expect(day.topics.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('3. Every day has an interactive lab specification and an independent challenge', () => {
    APPIUM_DAYS_DATA.forEach((day) => {
      expect(day.lab).toBeDefined();
      expect(day.lab.id).toBeDefined();
      expect(day.lab.title).toBeDefined();
      expect(day.lab.instructions.length).toBeGreaterThanOrEqual(2);

      expect(day.challenge).toBeDefined();
      expect(day.challenge.id).toBeDefined();
      expect(day.challenge.title).toBeDefined();
      expect(day.challenge.scenario).toBeDefined();
      expect(day.challenge.task).toBeDefined();
      expect(day.challenge.verificationCriteria.length).toBeGreaterThanOrEqual(2);
      expect(day.challenge.hints.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('4. Every day has interview questions and checkpoint quizzes (5 per day, 20 on Day 14)', () => {
    let totalInterview = 0;
    let totalQuiz = 0;

    APPIUM_DAYS_DATA.forEach((day) => {
      if (day.dayNumber === 14) {
        expect(day.interviewQuestions.length).toBe(20);
      } else {
        expect(day.interviewQuestions.length).toBe(5);
      }
      totalInterview += day.interviewQuestions.length;

      expect(day.quiz.length).toBe(5);
      totalQuiz += day.quiz.length;

      // Validate quiz question integrity
      day.quiz.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(q.question).toBeDefined();
        expect(q.options.length).toBe(4);
        expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswerIndex).toBeLessThan(q.options.length);
        expect(q.explanation).toBeDefined();
      });
    });

    // 13 days * 5 + 1 day * 20 = 85 interview questions
    expect(totalInterview).toBe(85);
    // 14 days * 5 = 70 quiz questions
    expect(totalQuiz).toBe(70);
  });

  it('5. Course is registered in COURSES catalog with 14 daily lessons', () => {
    const course = COURSES.find((c) => c.slug === 'appium-mobile-automation');
    expect(course).toBeDefined();
    expect(course?.id).toBe('course-appium-mobile-automation');
    expect(course?.trackName).toBe('Mobile Automation & Appium');
    expect(course?.lessons.length).toBe(14);
    expect(course?.quiz.questions.length).toBe(5);
  });

  it('6. Enrollment payment config includes appium-mobile-automation', () => {
    const pricing = ENROLLMENT_PAYMENT_CONFIG.pricing['appium-mobile-automation'];
    expect(pricing).toBeDefined();
    expect(pricing.inr).toBe(499);
    expect(pricing.originalInr).toBe(999);
    expect(pricing.isLaunchOffer).toBe(true);
    expect(pricing.label).toBe('Appium Mobile Automation with Java');
  });
});
