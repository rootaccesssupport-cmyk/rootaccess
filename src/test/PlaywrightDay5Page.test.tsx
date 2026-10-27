import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay5LessonPage } from '../pages/playwright/PlaywrightDay5LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import {
  evaluateDay5Assignment,
  PLAYWRIGHT_DAY_5_DATA,
  PLAYWRIGHT_DAY_5_STARTER_CODE,
  PLAYWRIGHT_DAY_5_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_5_STARTER_OUTPUT,
} from '../data/playwrightDay5Data';

function renderPlaywrightDay5Page(isEnrolled: boolean = true, isDay4Done: boolean = true) {
  if (isEnrolled) {
    const completedLessons = isDay4Done
      ? ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3', 'lesson-playwright-day-4']
      : ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3'];

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
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-5']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-5" element={<PlaywrightDay5LessonPage />} />
            <Route path="/courses/playwright-automation/day-4" element={<div>Day 4 Page</div>} />
            <Route path="/courses/playwright-automation/day-6" element={<div>Day 6 Page</div>} />
            <Route path="/courses/playwright-automation" element={<div>Course Detail Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation with JavaScript + AI — Day 5 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderPlaywrightDay5Page(false);

    expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Playwright Automation with JavaScript \+ AI/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enroll in Course for Free|Create Account to Enroll/i })).toBeInTheDocument();
  });

  it('renders Day 5 metadata, pure JavaScript badge, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay5Page(true);

    expect(screen.getByRole('heading', { level: 1, name: new RegExp(PLAYWRIGHT_DAY_5_DATA.lessonTitle, 'i') })).toBeInTheDocument();
    expect(screen.getByText(/Day 5 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated: 2\.5–3 Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check breadcrumbs
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation Testing')).toBeInTheDocument();

    // Check downloadable PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 5 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-5-actions-assertions-forms.pdf');
  });

  it('shows Day 4 prerequisite advisory link when Day 4 is not completed, but remains non-blocking', () => {
    renderPlaywrightDay5Page(true, false);

    expect(screen.getByText(/Prerequisite Recommendation:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Review Day 4 →/i })).toBeInTheDocument();
  });

  it('renders 5 structured modules and allows stepping through them with code examples', () => {
    renderPlaywrightDay5Page(true);

    // Verify all 5 topic stepper buttons exist
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(PLAYWRIGHT_DAY_5_DATA.topics[0].title, 'i') })).toBeInTheDocument();

    // Advance to Topic 2
    const markReadBtn = screen.getByRole('button', { name: /Mark as Read & Continue/i });
    fireEvent.click(markReadBtn);

    expect(screen.getByRole('heading', { level: 2, name: new RegExp(PLAYWRIGHT_DAY_5_DATA.topics[1].title, 'i') })).toBeInTheDocument();
  });

  it('evaluates practical assignment with 10-point rubric and passes valid starter solution', () => {
    renderPlaywrightDay5Page(true);

    // Navigate to practical assignment tab
    const assignmentTab = screen.getByRole('button', { name: /Practical Assignment/i });
    fireEvent.click(assignmentTab);

    expect(screen.getByRole('heading', { level: 2, name: /Complex Registration Form Test Suite/i })).toBeInTheDocument();

    // Click evaluate
    const evaluateBtn = screen.getByRole('button', { name: /Evaluate Assignment Submission/i });
    fireEvent.click(evaluateBtn);

    expect(screen.getByText(/Assignment Rubric Passed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
  });

  it('evaluates starter assignment directly using evaluateDay5Assignment function', () => {
    const evaluation = evaluateDay5Assignment(
      PLAYWRIGHT_DAY_5_STARTER_CODE,
      PLAYWRIGHT_DAY_5_STARTER_OUTPUT,
      PLAYWRIGHT_DAY_5_STARTER_EXPLANATION
    );

    expect(evaluation.score).toBe(10);
    expect(evaluation.passed).toBe(true);
    expect(evaluation.criteria.length).toBe(10);
    expect(evaluation.criteria.every((c) => c.passed)).toBe(true);
  });

  it('renders 5 interview questions and allows expanding model answers', () => {
    renderPlaywrightDay5Page(true);

    const interviewTab = screen.getByRole('button', { name: /Interview Questions/i });
    fireEvent.click(interviewTab);

    expect(screen.getByText(/Day 5 Interview Question Bank/i)).toBeInTheDocument();

    // Click first question
    const q1 = PLAYWRIGHT_DAY_5_DATA.interviewQuestions[0];
    const q1Btn = screen.getByText(q1.question);
    fireEvent.click(q1Btn);

    expect(screen.getByText(/Suggested Professional Model Answer:/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(q1.modelAnswer.slice(0, 20)))).toBeInTheDocument();

    // Mark as reviewed
    const markReviewedBtn = screen.getByRole('button', { name: /Mark Interview Prep Reviewed/i });
    fireEvent.click(markReviewedBtn);
    expect(screen.getByText(/Interview Prep Reviewed ✓/i)).toBeInTheDocument();
  });

  it('evaluates checkpoint quiz requiring ≥ 80% passing threshold with retake functionality', () => {
    renderPlaywrightDay5Page(true);

    const quizTab = screen.getByRole('button', { name: /Checkpoint Quiz/i });
    fireEvent.click(quizTab);

    expect(screen.getByRole('heading', { level: 2, name: /Day 5 Checkpoint Quiz/i })).toBeInTheDocument();

    // Answer questions with correct answers
    PLAYWRIGHT_DAY_5_DATA.quizQuestions.forEach((q) => {
      const optText = q.options[q.correctAnswerIndex].slice(0, 25);
      const btn = screen.getAllByRole('button').find((b) => b.textContent?.includes(optText));
      expect(btn).toBeDefined();
      fireEvent.click(btn!);
    });

    const submitBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkpoint quiz passed! \(≥ 80%\)/i)).toBeInTheDocument();

    // Retake quiz
    const retakeBtn = screen.getByRole('button', { name: /Retake Quiz/i });
    fireEvent.click(retakeBtn);
    expect(screen.getByRole('button', { name: /Submit Quiz for Scoring/i })).toBeInTheDocument();
  });
});
