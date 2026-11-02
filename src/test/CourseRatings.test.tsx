import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  COURSE_RATINGS_DATA,
  getCourseRatingSummary,
} from '../data/courseRatingsData';
import { CourseRatingDisplay } from '../components/common/CourseRatingDisplay';
import { COURSES } from '../data/curriculumData';

describe('RootAccess Course Ratings & Interview Course Removal', () => {
  const activeCourseSlugs = [
    'playwright-automation',
    'manual-qa-fundamentals',
    'sql-for-qa-engineers',
    'api-testing-postman',
    'ai-prompt-engineering',
  ];

  const expectedCounts: Record<string, number> = {
    'playwright-automation': 20,
    'manual-qa-fundamentals': 20,
    'sql-for-qa-engineers': 14,
    'api-testing-postman': 12,
    'ai-prompt-engineering': 33,
  };

  describe('1. Varied Member Ratings per Course (20/12/14/33 etc.)', () => {
    it('ensures each active course has dummy ratings from varied members (20, 14, 12, 33)', () => {
      activeCourseSlugs.forEach((slug) => {
        const summary = getCourseRatingSummary(slug);
        const expected = expectedCounts[slug];
        expect(summary.totalRatings, `Course ${slug} should have ${expected} ratings`).toBe(expected);
        expect(summary.reviews.length, `Course ${slug} reviews array should have ${expected} items`).toBe(expected);
      });
    });
  });

  describe('2. Average Rating of 4.2 / 4.4 / 4.5 / 4.6', () => {
    it('ensures course average ratings match the requested 4.2 to 4.6 range', () => {
      const playwright = getCourseRatingSummary('playwright-automation');
      const manual = getCourseRatingSummary('manual-qa-fundamentals');
      const sql = getCourseRatingSummary('sql-for-qa-engineers');
      const api = getCourseRatingSummary('api-testing-postman');
      const ai = getCourseRatingSummary('ai-prompt-engineering');

      // Playwright: 4.5 average
      expect(playwright.averageRating).toBe(4.5);

      // SQL: 4.5 average
      expect(sql.averageRating).toBe(4.5);

      // Manual QA: 4.4 average
      expect(manual.averageRating).toBe(4.4);

      // API Testing: 4.2 average
      expect(api.averageRating).toBe(4.2);

      // AI Course: 4.6 average
      expect(ai.averageRating).toBe(4.6);
    });

    it('mathematically validates that the reviews array average matches the summary averageRating', () => {
      activeCourseSlugs.forEach((slug) => {
        const summary = getCourseRatingSummary(slug);
        const sum = summary.reviews.reduce((acc, r) => acc + r.rating, 0);
        const calculatedAverage = Number((sum / summary.reviews.length).toFixed(1));
        expect(calculatedAverage).toBe(summary.averageRating);
      });
    });
  });

  describe('3. Minimum 3 Stars Guarantee (Nothing Less than 3 Stars)', () => {
    it('ensures no review across any course has less than 3 stars', () => {
      Object.entries(COURSE_RATINGS_DATA).forEach(([slug, summary]) => {
        summary.reviews.forEach((review) => {
          expect(
            review.rating,
            `Review by ${review.author} in ${slug} must be at least 3 stars`
          ).toBeGreaterThanOrEqual(3);
        });

        // Distribution check
        expect(summary.distribution[1]).toBe(0);
        expect(summary.distribution[2]).toBe(0);
        expect(summary.distribution[3]).toBeGreaterThanOrEqual(1);
        expect(summary.distribution[4]).toBeGreaterThanOrEqual(1);
        expect(summary.distribution[5]).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('4. Complete Removal of Interview Preparation Course', () => {
    it('ensures qa-interview-mastery / course-interview-prep is not present in COURSES curriculum', () => {
      const interviewCourse = COURSES.find(
        (c) => c.slug === 'qa-interview-mastery' || c.id === 'course-interview-prep'
      );
      expect(interviewCourse).toBeUndefined();
    });

    it('ensures only core engineering courses remain in COURSES', () => {
      const slugs = COURSES.map((c) => c.slug);
      expect(slugs).toContain('manual-qa-fundamentals');
      expect(slugs).toContain('sql-for-qa-engineers');
      expect(slugs).toContain('api-testing-postman');
      expect(slugs).toContain('playwright-automation');
      expect(slugs).not.toContain('qa-interview-mastery');
    });
  });

  describe('5. CourseRatingDisplay Component Rendering', () => {
    it('renders compact variant on course card with stars, score, and 20 ratings link', () => {
      render(<CourseRatingDisplay courseSlug="playwright-automation" variant="compact" />);

      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('(20 ratings)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /read reviews/i })).toBeInTheDocument();
    });

    it('renders banner variant for course detail page header', () => {
      render(<CourseRatingDisplay courseSlug="sql-for-qa-engineers" variant="banner" />);

      expect(screen.getByText('4.5 / 5.0')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /14 verified learner ratings/i })).toBeInTheDocument();
      expect(screen.getByText(/100% ≥ 3★ ratings/i)).toBeInTheDocument();
    });

    it('renders section variant with breakdown bars and recent student feedback', () => {
      render(<CourseRatingDisplay courseSlug="api-testing-postman" variant="section" />);

      expect(screen.getByText('4.2')).toBeInTheDocument();
      expect(screen.getByText(/learner reviews \(12 members\)/i)).toBeInTheDocument();
      expect(screen.getByText(/read all 12 student reviews/i)).toBeInTheDocument();
      expect(screen.getByText('Rating Distribution')).toBeInTheDocument();
    });
  });
});
