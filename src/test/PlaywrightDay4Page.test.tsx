import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay4LessonPage } from '../pages/playwright/PlaywrightDay4LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import {
  evaluateDay4Assignment,
  PLAYWRIGHT_DAY_4_STARTER_CODE,
  PLAYWRIGHT_DAY_4_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_4_STARTER_OUTPUT,
} from '../data/playwrightDay4Data';

function renderPlaywrightDay4Page(isEnrolled: boolean = true, isDay3Done: boolean = true) {
  if (isEnrolled) {
    const completedLessons = isDay3Done
      ? ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3']
      : ['lesson-playwright-day-1', 'lesson-playwright-day-2'];

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
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-4']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-4" element={<PlaywrightDay4LessonPage />} />
            <Route path="/courses/playwright-automation/day-3" element={<div>Day 3 Page</div>} />
            <Route path="/courses/playwright-automation/day-2" element={<div>Day 2 Page</div>} />
            <Route path="/courses/playwright-automation/day-1" element={<div>Day 1 Page</div>} />
            <Route path="/courses/playwright-automation" element={<div>Course Detail Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation with JavaScript + AI — Day 4 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderPlaywrightDay4Page(false);

    expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Playwright Automation with JavaScript \+ AI/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enroll in Course for Free|Create Account to Enroll/i })).toBeInTheDocument();
  });

  it('renders Day 4 metadata, pure JavaScript badge, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay4Page(true);

    expect(screen.getByRole('heading', { level: 1, name: /Locators and Element Identification/i })).toBeInTheDocument();
    expect(screen.getByText(/Day 4 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated: 2\.5–3 Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check breadcrumbs
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation Testing')).toBeInTheDocument();

    // Check downloadable PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 4 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-4-locators-and-element-identification.pdf');
  });

  it('shows Day 3 prerequisite advisory link when Day 3 is not completed, but remains non-blocking', () => {
    renderPlaywrightDay4Page(true, false);

    expect(screen.getByText(/Prerequisite Recommendation:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Review Day 3 →/i })).toBeInTheDocument();
  });

  it('renders 7 structured modules and allows stepping through them with code examples', () => {
    renderPlaywrightDay4Page(true);

    // Verify all 7 topic stepper buttons exist
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 6/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 7/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: /Topic 1: What Is a Locator\?/i })).toBeInTheDocument();

    // Click "Mark as Read & Continue" to advance to Topic 2
    const continueBtn = screen.getByRole('button', { name: /Mark as Read & Continue/i });
    fireEvent.click(continueBtn);

    // Topic 2 is now displayed
    expect(screen.getByRole('heading', { level: 2, name: /Topic 2: Playwright User-Facing Locators/i })).toBeInTheDocument();

    // Navigate to Topic 7 (AI-Assisted Locator Selection)
    fireEvent.click(screen.getByRole('button', { name: /Topic 7/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 7: AI-Assisted Locator Selection/i })).toBeInTheDocument();
    expect(screen.getByText(/Proven AI Locator Prompt Template/i)).toBeInTheDocument();
  });

  it('supports interactive practice exercises with option selection and instant feedback', () => {
    renderPlaywrightDay4Page(true);

    // Topic 1 has Exercise A
    expect(screen.getByText(/Exercise A: Choose the Best Locator/i)).toBeInTheDocument();

    // Select the correct option: page.getByRole('button', { name: 'Log In to Account' })
    const correctOption = screen.getByRole('button', { name: /page\.getByRole\('button', \{ name: 'Log In to Account' \}\)/i });
    fireEvent.click(correctOption);

    // Click Check Answer
    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);

    // Detailed explanation appears
    expect(screen.getByText(/Detailed Technical Explanation:/i)).toBeInTheDocument();
    expect(screen.getByText(/is the gold standard because it tests the button the way users and screen readers see it/i)).toBeInTheDocument();
  });

  it('allows resetting the exercise after choosing a wrong answer to try again', () => {
    renderPlaywrightDay4Page(true);

    // Select wrong option (e.g. dynamic class)
    const wrongOption = screen.getByRole('button', { name: /page\.locator\('\.dynamic-btn-88'\)/i });
    fireEvent.click(wrongOption);

    // Submit wrong answer
    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);

    // Shows review recommended and Reset & Try Again button
    expect(screen.getByText(/Review Recommended/i)).toBeInTheDocument();
    expect(screen.getByText(/Incorrect selection\. Reset this question to select another option\./i)).toBeInTheDocument();
    const resetBtn = screen.getByRole('button', { name: /Reset & Try Again/i });
    expect(resetBtn).toBeInTheDocument();

    // Click Reset & Try Again
    fireEvent.click(resetBtn);

    // Check Answer is back and wrong selection is cleared
    expect(screen.getByRole('button', { name: /Check Answer/i })).toBeDisabled();

    // Now select the correct answer
    const correctOption = screen.getByRole('button', { name: /page\.getByRole\('button', \{ name: 'Log In to Account' \}\)/i });
    fireEvent.click(correctOption);
    expect(screen.getByRole('button', { name: /Check Answer/i })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    // Now correct answer is verified
    expect(screen.getByText(/Correct Answer ✓/i)).toBeInTheDocument();
  });

  it('evaluates Day 4 Practical Assignment with deterministic 10-point rubric', () => {
    // 1. Evaluate default starter code
    const initialResult = evaluateDay4Assignment(
      PLAYWRIGHT_DAY_4_STARTER_CODE,
      PLAYWRIGHT_DAY_4_STARTER_OUTPUT,
      PLAYWRIGHT_DAY_4_STARTER_EXPLANATION
    );

    expect(initialResult.score).toBe(10);
    expect(initialResult.passed).toBe(true);
    expect(initialResult.criteria.length).toBe(10);
    expect(initialResult.criteria.every((c) => c.passed)).toBe(true);

    // 2. Evaluate incomplete code
    const failingResult = evaluateDay4Assignment(
      'console.log("hello");',
      'empty',
      'short'
    );
    expect(failingResult.score).toBeLessThan(8);
    expect(failingResult.passed).toBe(false);

    // 3. UI interaction on assignment tab
    renderPlaywrightDay4Page(true);

    fireEvent.click(screen.getByRole('button', { name: /Practical Assignment/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Build a Resilient Locator Practice Test Suite/i })).toBeInTheDocument();

    // Click evaluate
    const evalBtn = screen.getByRole('button', { name: /Evaluate Assignment Submission/i });
    fireEvent.click(evalBtn);

    expect(screen.getByText(/Assignment Rubric Passed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
  });

  it('toggles suggested answers in Interview Question Bank', () => {
    renderPlaywrightDay4Page(true);

    // Switch to Interview tab
    fireEvent.click(screen.getByRole('button', { name: /Interview Questions/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Day 4 Interview Question Bank/i })).toBeInTheDocument();

    // Question 1
    const q1Button = screen.getByRole('button', { name: /What is a Locator in Playwright, and how does it differ from a DOM element handle in Selenium\?/i });
    expect(screen.queryByText(/In Playwright, a Locator is a lazy description or view of how to find elements/i)).not.toBeInTheDocument();

    // Expand Question 1
    fireEvent.click(q1Button);
    expect(screen.getByText(/In Playwright, a Locator is a lazy description or view of how to find elements/i)).toBeInTheDocument();

    // Mark Interview reviewed
    const markReviewedBtn = screen.getByRole('button', { name: /Mark Interview Prep Reviewed/i });
    fireEvent.click(markReviewedBtn);
    expect(screen.getByText(/Interview Prep Reviewed ✓/i)).toBeInTheDocument();
  });

  it('runs Checkpoint Quiz and grades with 80% passing threshold', () => {
    renderPlaywrightDay4Page(true);

    // Switch to Quiz tab
    fireEvent.click(screen.getByRole('button', { name: /Checkpoint Quiz/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Day 4 Checkpoint Quiz/i })).toBeInTheDocument();

    // Answer all 10 questions correctly
    // Q1: Option B (lazy view...)
    fireEvent.click(screen.getByRole('button', { name: /A Playwright Locator is a lazy view that queries the DOM afresh on action and auto-waits/i }));
    // Q2: Option B (page.getByRole...)
    fireEvent.click(screen.getByRole('button', { name: /page\.getByRole\(role, \{ name \}\)/i }));
    // Q3: Option C (Playwright throws a Strict Mode Violation...)
    fireEvent.click(screen.getByRole('button', { name: /Playwright throws a Strict Mode Violation error and fails the test/i }));
    // Q4: Option B (page.locator(".card").filter...)
    fireEvent.click(screen.getByRole('button', { name: /page\.locator\("\.card"\)\.filter\(\{ hasText: "Product Name" \}\)\.getByRole\("button", \{ name: "Buy" \}\)/i }));
    // Q5: Option B (await expect(locator).toBeVisible() automatically polls...)
    fireEvent.click(screen.getByRole('button', { name: /await expect\(locator\)\.toBeVisible\(\) automatically polls and retries until the condition is met/i }));
    // Q6: Option B (page.getByLabel("Email"))
    fireEvent.click(screen.getByRole('button', { name: /page\.getByLabel\("Email"\)/i }));
    // Q7: Option B (npx playwright test --debug)
    fireEvent.click(screen.getByRole('button', { name: /npx playwright test --debug/i }));
    // Q8: Option B (CSS utility classes represent visual design implementation...)
    fireEvent.click(screen.getByRole('button', { name: /CSS utility classes represent visual design implementation and frequently change during restyling/i }));
    // Q9: Option C (Polls the DOM until exactly 4 elements matching the locator exist...)
    fireEvent.click(screen.getByRole('button', { name: /Polls the DOM until exactly 4 elements matching the locator exist/i }));
    // Q10: Option C (Reject the absolute XPath and refactor it into an accessible locator...)
    fireEvent.click(screen.getByRole('button', { name: /Reject the absolute XPath and refactor it into an accessible locator like page\.getByRole\("button", \{ name: "Submit" \}\)/i }));

    // Submit quiz
    const submitQuizBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitQuizBtn);

    // Passed!
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Checkpoint quiz passed!/i).length).toBeGreaterThan(0);
  });

  it('enforces all 5 completion milestones before allowing Day 4 completion', () => {
    renderPlaywrightDay4Page(true);

    // Attempting to mark Day 4 complete without completing milestones
    const markCompleteBtn = screen.getByRole('button', { name: /Mark Day 4 Complete/i });
    fireEvent.click(markCompleteBtn);

    // Warning message appears
    expect(screen.getByText(/Action Required: Please read all 7 topics in "Core Concepts & Walkthrough" before completing Day 4\./i)).toBeInTheDocument();
  });

  it('opens Day 5 Preview modal indicating lock status', () => {
    renderPlaywrightDay4Page(true);

    const day5NavBtn = screen.getByRole('button', { name: /Day 5/i });
    fireEvent.click(day5NavBtn);

    expect(screen.getByRole('heading', { level: 3, name: /Day 5: Web-First Assertions & Actions/i })).toBeInTheDocument();
    expect(screen.getByText(/Locked until Day 4 completion requirements are satisfied\./i)).toBeInTheDocument();
  });
});
