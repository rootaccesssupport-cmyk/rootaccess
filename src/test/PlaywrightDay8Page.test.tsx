import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay8LessonPage } from '../pages/playwright/PlaywrightDay8LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import {
  evaluateDay8Assignment,
  PLAYWRIGHT_DAY_8_DATA,
  PLAYWRIGHT_DAY_8_STARTER_CODE,
  PLAYWRIGHT_DAY_8_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_8_STARTER_OUTPUT,
} from '../data/playwrightDay8Data';

function renderPlaywrightDay8Page(isEnrolled: boolean = true, isDay7Done: boolean = true) {
  if (isEnrolled) {
    const completedLessons = isDay7Done
      ? ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3', 'lesson-playwright-day-4', 'lesson-playwright-day-5', 'lesson-playwright-day-6', 'lesson-playwright-day-7']
      : ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3', 'lesson-playwright-day-4', 'lesson-playwright-day-5', 'lesson-playwright-day-6'];

    const progressData = JSON.stringify({
      completedLessons,
      lessonNotes: {},
      quizScores: {},
      enrolledCourses: ['playwright-automation'],
    });
    localStorage.setItem('rootaccess_progress_guest', progressData);
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
  }

  return render(
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-8']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-8" element={<PlaywrightDay8LessonPage />} />
            <Route path="/courses/playwright-automation/day-7" element={<div>Day 7 Page</div>} />
            <Route path="/courses/playwright-automation" element={<div>Course Detail Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation with JavaScript + AI — Day 8 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderPlaywrightDay8Page(false);

    expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Playwright Automation with JavaScript \+ AI/i })).toBeInTheDocument();
  });

  it('renders Day 8 metadata, pure JavaScript badge, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay8Page(true);

    expect(screen.getByRole('heading', { level: 1, name: new RegExp(PLAYWRIGHT_DAY_8_DATA.lessonTitle, 'i') })).toBeInTheDocument();
    expect(screen.getByText(/Day 8 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(PLAYWRIGHT_DAY_8_DATA.estimatedHours, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check downloadable PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 8 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-8-test-runner-fixtures-organization.pdf');
  });

  it('shows Day 7 prerequisite advisory link when Day 7 is not completed, but remains non-blocking', () => {
    renderPlaywrightDay8Page(true, false);

    expect(screen.getByText(/Prerequisite Recommendation:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Review Day 7 →/i })).toBeInTheDocument();
  });

  it('renders 6 structured modules and allows stepping through them with code examples', () => {
    renderPlaywrightDay8Page(true);

    // Verify all 6 topic stepper buttons exist
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 6/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(PLAYWRIGHT_DAY_8_DATA.topics[0].title, 'i') })).toBeInTheDocument();
  });

  it('evaluates practical assignment with 10-point rubric and passes valid starter solution', () => {
    renderPlaywrightDay8Page(true);

    // Navigate to practical assignment tab
    const assignmentTab = screen.getByRole('button', { name: /Practical Assignment/i });
    fireEvent.click(assignmentTab);

    expect(screen.getByRole('heading', { level: 2, name: /Practical Assignment: Enterprise Test Suite Architecture/i })).toBeInTheDocument();

    // Click evaluate
    const evaluateBtn = screen.getByRole('button', { name: /Evaluate Assignment Submission/i });
    fireEvent.click(evaluateBtn);

    expect(screen.getByText(/Assignment Rubric Passed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
  });

  it('evaluates starter assignment directly using evaluateDay8Assignment function', () => {
    const evaluation = evaluateDay8Assignment(
      PLAYWRIGHT_DAY_8_STARTER_CODE,
      PLAYWRIGHT_DAY_8_STARTER_OUTPUT,
      PLAYWRIGHT_DAY_8_STARTER_EXPLANATION
    );

    expect(evaluation.score).toBe(10);
    expect(evaluation.passed).toBe(true);
    expect(evaluation.criteria.length).toBe(10);
    expect(evaluation.criteria.every((c) => c.passed)).toBe(true);
  });

  it('renders 5 interview questions and allows expanding model answers', () => {
    renderPlaywrightDay8Page(true);

    const interviewTab = screen.getByRole('button', { name: /Interview Questions/i });
    fireEvent.click(interviewTab);

    expect(screen.getByText(/Day 8 Interview Question Bank/i)).toBeInTheDocument();

    // Click first question
    const q1 = PLAYWRIGHT_DAY_8_DATA.interviewQuestions[0];
    const q1Btn = screen.getByText(q1.question);
    fireEvent.click(q1Btn);

    expect(screen.getByText(/Suggested Professional Model Answer:/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(q1.modelAnswer.slice(0, 20)))).toBeInTheDocument();
  });

  it('evaluates checkpoint quiz requiring ≥ 80% passing threshold', () => {
    renderPlaywrightDay8Page(true);

    const quizTab = screen.getByRole('button', { name: /Checkpoint Quiz/i });
    fireEvent.click(quizTab);

    expect(screen.getByRole('heading', { level: 2, name: /Day 8 Checkpoint Quiz/i })).toBeInTheDocument();

    // Answer questions with correct answers
    PLAYWRIGHT_DAY_8_DATA.quizQuestions.forEach((q) => {
      const optText = q.options[q.correctAnswerIndex].slice(0, 25);
      const btn = screen.getAllByRole('button').find((b) => b.textContent?.includes(optText));
      expect(btn).toBeDefined();
      fireEvent.click(btn!);
    });

    const submitBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkpoint quiz passed! \(≥ 80%\)/i)).toBeInTheDocument();
  });
});
