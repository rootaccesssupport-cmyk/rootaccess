import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay3LessonPage } from '../pages/playwright/PlaywrightDay3LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import {
  evaluateDay3Assignment,
  PLAYWRIGHT_DAY_3_STARTER_CODE,
  PLAYWRIGHT_DAY_3_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_3_STARTER_OUTPUT,
} from '../data/playwrightDay3Data';

function renderPlaywrightDay3Page(isEnrolled: boolean = true, isDay2Done: boolean = true) {
  if (isEnrolled) {
    const completedLessons = isDay2Done
      ? ['lesson-playwright-day-1', 'lesson-playwright-day-2']
      : ['lesson-playwright-day-1'];

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
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-3']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-3" element={<PlaywrightDay3LessonPage />} />
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

describe('Playwright Automation with JavaScript — Day 3 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderPlaywrightDay3Page(false);

    expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Playwright Automation (Testing with JavaScript|with JavaScript \+ AI)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enroll in Course for Free|Create Account to Enroll/i })).toBeInTheDocument();
  });

  it('renders Day 3 metadata, pure JavaScript badge, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay3Page(true);

    expect(screen.getByRole('heading', { level: 1, name: /Environment Setup and Your First Playwright Test/i })).toBeInTheDocument();
    expect(screen.getByText(/Day 3 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated: 2–3 Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check breadcrumbs
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation Testing')).toBeInTheDocument();

    // Check downloadable PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 3 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-3-environment-setup-and-your-first-playwright-test.pdf');
  });

  it('shows Day 2 prerequisite advisory link when Day 2 is not completed, but remains non-blocking', () => {
    renderPlaywrightDay3Page(true, false);

    expect(screen.getByText(/Prerequisite Recommendation:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Review Day 2 →/i })).toBeInTheDocument();
  });

  it('renders 6 structured topics and allows stepping through them with code examples', () => {
    renderPlaywrightDay3Page(true);

    // Verify all 6 topic stepper buttons exist
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 6/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: /Topic 1: Understanding the Development Tools/i })).toBeInTheDocument();

    // Navigate to Topic 2
    fireEvent.click(screen.getByRole('button', { name: /Topic 2/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 2: Installing and Preparing Playwright/i })).toBeInTheDocument();

    // Navigate to Topic 4 (First Test Script in JS)
    fireEvent.click(screen.getByRole('button', { name: /Topic 4/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 4: Write Your First Playwright Test/i })).toBeInTheDocument();
    expect(screen.getByText(/The CommonJS Test Example/i)).toBeInTheDocument();
    expect(screen.getByText(/Note on Module Systems/i)).toBeInTheDocument();

    // Navigate to Topic 6 (Troubleshooting)
    fireEvent.click(screen.getByRole('button', { name: /Topic 6/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 6: Basic Configuration and Troubleshooting/i })).toBeInTheDocument();
    expect(screen.getByText(/Top 8 Troubleshooting Scenarios/i)).toBeInTheDocument();
  });

  it('supports interactive practice exercises with option selection and instant feedback', () => {
    renderPlaywrightDay3Page(true);

    // Topic 1 practice exercise
    expect(screen.getByText(/Topic 1 Practice Exercise/i)).toBeInTheDocument();
    expect(screen.getByText(/Exercise 1: Development Tool Roles/i)).toBeInTheDocument();

    // Select option B
    const optionB = screen.getByRole('button', { name: /Because our test script runs on the operating system to control browser processes/i });
    fireEvent.click(optionB);

    // Submit answer
    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);

    // Verified feedback
    expect(screen.getByText(/Correct ✓/i)).toBeInTheDocument();
    expect(screen.getByText(/Well done!/i)).toBeInTheDocument();
  });

  it('evaluates practical assignment using deterministic 10-point rubric', () => {
    // Test the evaluator function directly with starter data
    const validResult = evaluateDay3Assignment({
      code: PLAYWRIGHT_DAY_3_STARTER_CODE,
      explanation: PLAYWRIGHT_DAY_3_STARTER_EXPLANATION,
      expectedOutput: PLAYWRIGHT_DAY_3_STARTER_OUTPUT,
      projectSetupConfirmed: true,
    });

    expect(validResult.score).toBe(10);
    expect(validResult.passed).toBe(true);

    // Test with missing assertions or missing imports
    const invalidResult = evaluateDay3Assignment({
      code: 'console.log("hello world");',
      explanation: 'Short',
      expectedOutput: 'None',
      projectSetupConfirmed: false,
    });
    expect(invalidResult.passed).toBe(false);
    expect(invalidResult.score).toBeLessThan(8);
  });

  it('allows running evaluator in the Practical Assignment tab', () => {
    renderPlaywrightDay3Page(true);

    // Switch to Assignment tab
    fireEvent.click(screen.getByRole('button', { name: /2\. Practical Assignment/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Build and Run Your First Playwright Test/i })).toBeInTheDocument();
    expect(screen.getByText(/Assignment Rubric Requirements \(10 Criteria\)/i)).toBeInTheDocument();

    // Click Evaluate & Submit Assignment
    const evaluateBtn = screen.getByRole('button', { name: /Evaluate & Submit Assignment/i });
    fireEvent.click(evaluateBtn);

    // Verify evaluation passes with starter code
    expect(screen.getByText(/Assignment Approved! All 10 Criteria Satisfied/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10\/10/i)).toBeInTheDocument();
  });

  it('renders 10 interview questions with collapsible model answers and review marking', () => {
    renderPlaywrightDay3Page(true);

    // Switch to Interview tab
    fireEvent.click(screen.getByRole('button', { name: /3\. Interview Question Bank/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Day 3 QA Interview Question Bank/i })).toBeInTheDocument();

    // Check Question 1
    const q1Text = screen.getByText(/What is Node\.js, and why is it used in Playwright projects\?/i);
    expect(q1Text).toBeInTheDocument();

    // Expand Question 1
    fireEvent.click(q1Text);

    // Model answer should now be visible
    expect(screen.getByText(/Model Suggested Answer:/i)).toBeInTheDocument();
    expect(screen.getByText(/Node\.js is an open-source, cross-platform JavaScript runtime environment/i)).toBeInTheDocument();

    // Click Mark Interview Prep Reviewed
    const reviewBtn = screen.getAllByRole('button', { name: /Mark Interview Prep Reviewed/i })[0];
    fireEvent.click(reviewBtn);

    expect(screen.getAllByText(/Reviewed ✓/i).length).toBeGreaterThan(0);
  });

  it('runs Checkpoint Quiz and grades with 80% passing threshold', () => {
    renderPlaywrightDay3Page(true);

    // Switch to Quiz tab
    fireEvent.click(screen.getByRole('button', { name: /4\. Checkpoint Quiz/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Day 3 Knowledge Verification Quiz/i })).toBeInTheDocument();

    // Q1: Option B
    fireEvent.click(screen.getByRole('button', { name: /A JavaScript runtime that executes our automation test scripts on our local computer/i }));
    // Q2: Option A
    fireEvent.click(screen.getByRole('button', { name: /npm init playwright@latest/i }));
    // Q3: Option B
    fireEvent.click(screen.getByRole('button', { name: /B JavaScript/i }));
    // Q4: Option B
    fireEvent.click(screen.getByRole('button', { name: /It is the default directory where Playwright looks for automated test specification files/i }));
    // Q5: Option B
    fireEvent.click(screen.getByRole('button', { name: /A built-in Playwright test fixture providing an isolated browser tab for the test/i }));
    // Q6: Option B
    fireEvent.click(screen.getByRole('button', { name: /B page\.goto\(url\)/i }));
    // Q7: Option B
    fireEvent.click(screen.getByRole('button', { name: /Checks if the element is present and visible, automatically polling and waiting for it to appear/i }));
    // Q8: Option A
    fireEvent.click(screen.getByRole('button', { name: /npx playwright test --headed/i }));
    // Q9: Option B
    fireEvent.click(screen.getByRole('button', { name: /Because it is very large and can be regenerated anytime by running npm install/i }));
    // Q10: Option B
    fireEvent.click(screen.getByRole('button', { name: /Run npx playwright install to download the required browser binaries/i }));

    // Submit quiz
    const submitQuizBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitQuizBtn);

    // Passed
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Checkpoint quiz passed!/i).length).toBeGreaterThan(0);
  });

  it('enforces all 5 completion milestones before allowing Day 3 completion', () => {
    renderPlaywrightDay3Page(true);

    // Attempting to mark Day 3 complete without completing milestones
    const markCompleteBtn = screen.getByRole('button', { name: /Mark Day 3 Complete/i });
    fireEvent.click(markCompleteBtn);

    // Warning message appears
    expect(screen.getByText(/Action Required: Please read all 6 topics in "Core Concepts & Walkthrough" before completing Day 3\./i)).toBeInTheDocument();
  });

  it('navigates directly to Day 4 via header link', () => {
    renderPlaywrightDay3Page(true);

    const day4NavBtn = screen.getByRole('link', { name: /Day 4/i });
    expect(day4NavBtn).toBeInTheDocument();
    expect(day4NavBtn).toHaveAttribute('href', '/courses/playwright-automation/day-4');
  });
});
