import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay2LessonPage } from '../pages/playwright/PlaywrightDay2LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import { evaluateDay2Assignment, PLAYWRIGHT_DAY_2_STARTER_CODE } from '../data/playwrightDay2Data';

function renderPlaywrightDay2Page(isEnrolled: boolean = true) {
  if (isEnrolled) {
    const progressData = JSON.stringify({
      completedLessons: ['lesson-playwright-day-1'],
      lessonNotes: {},
      quizScores: {},
      enrolledCourses: ['playwright-automation'],
    });
    localStorage.setItem('rootaccess_progress_guest', progressData);
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
  }

  return render(
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-2']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-2" element={<PlaywrightDay2LessonPage />} />
            <Route path="/courses/playwright-automation/day-1" element={<div>Day 1 Page</div>} />
            <Route path="/courses/playwright-automation" element={<div>Course Detail Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation with JavaScript — Day 2 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderPlaywrightDay2Page(false);

    expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Playwright Automation (Testing with JavaScript|with JavaScript \+ AI)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enroll in Course for Free|Create Account to Enroll/i })).toBeInTheDocument();
  });

  it('renders Day 2 metadata, pure JavaScript badge, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay2Page(true);

    expect(screen.getByRole('heading', { level: 1, name: /JavaScript Essentials for Test Automation/i })).toBeInTheDocument();
    expect(screen.getByText(/Day 2 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated: 2–3 Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check breadcrumb
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation Testing')).toBeInTheDocument();

    // Check downloadable PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 2 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-2-javascript-essentials-for-test-automation.pdf');
  });

  it('renders 6 structured topics and allows stepping through them with code examples', () => {
    renderPlaywrightDay2Page(true);

    // Verify all 6 topic stepper buttons exist
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 6/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: /Topic 1: JavaScript Fundamentals/i })).toBeInTheDocument();

    // Navigate to Topic 2
    fireEvent.click(screen.getByRole('button', { name: /Topic 2/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 2: Conditions and Comparison Operators/i })).toBeInTheDocument();

    // Navigate to Topic 6 (Async)
    fireEvent.click(screen.getByRole('button', { name: /Topic 6/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 6: Asynchronous JavaScript, Promises, and Modules/i })).toBeInTheDocument();
    expect(screen.getByText(/Synchronous vs Asynchronous Execution/i)).toBeInTheDocument();
  });

  it('supports interactive practice exercises with option selection and instant feedback', () => {
    renderPlaywrightDay2Page(true);

    // Check Topic 1 exercise
    expect(screen.getByText(/Topic 1 Practice Exercise/i)).toBeInTheDocument();
    expect(screen.getByText(/Exercise 1: Identify Data Types & Mutability/i)).toBeInTheDocument();

    // Select option C (TypeError...)
    const optionC = screen.getByRole('button', { name: /attempting to reassign a const throws a TypeError/i });
    fireEvent.click(optionC);

    // Submit answer
    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);

    // Verified feedback
    expect(screen.getByText(/Correct ✓/i)).toBeInTheDocument();
    expect(screen.getByText(/Well done!/i)).toBeInTheDocument();
  });

  it('evaluates practical assignment using deterministic 10-point rubric', () => {
    // Test the evaluator function directly
    const validResult = evaluateDay2Assignment({
      code: PLAYWRIGHT_DAY_2_STARTER_CODE,
      explanation: 'This test utility creates fixtures for our Playwright tests. We import scenarios into test specs to run parameterized data-driven tests. Functions compute metrics and prepare async state before browser automation.',
      expectedOutput: 'Total Scenarios: 5\nHigh Priority Scenarios: 2\nAsync Setup Success',
    });

    expect(validResult.score).toBe(10);
    expect(validResult.passed).toBe(true);

    // Test with invalid code containing var
    const invalidResult = evaluateDay2Assignment({
      code: 'var x = 10; function run() {}',
      explanation: 'Short',
      expectedOutput: 'None',
    });
    expect(invalidResult.passed).toBe(false);
    expect(invalidResult.score).toBeLessThan(10);
  });

  it('allows editing code and running evaluator in the Assignment tab', () => {
    renderPlaywrightDay2Page(true);

    // Switch to Assignment tab
    fireEvent.click(screen.getByRole('button', { name: /2\. Practical Assignment/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Create a JavaScript Test Data Utility/i })).toBeInTheDocument();
    expect(screen.getByText(/Assignment Rubric Requirements \(10 Criteria\)/i)).toBeInTheDocument();

    // Click Evaluate & Submit Assignment
    const evaluateBtn = screen.getByRole('button', { name: /Evaluate & Submit Assignment/i });
    fireEvent.click(evaluateBtn);

    // Verify evaluation passes with starter code
    expect(screen.getByText(/Assignment Approved! All 10 Criteria Satisfied/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10\/10/i)).toBeInTheDocument();
  });

  it('renders 10 interview questions with collapsible model answers and review marking', () => {
    renderPlaywrightDay2Page(true);

    // Switch to Interview tab
    fireEvent.click(screen.getByRole('button', { name: /3\. Interview Question Bank/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Day 2 QA Interview Question Bank/i })).toBeInTheDocument();

    // Check Question 1
    const q1Text = screen.getByText(/What is the difference between let and const in JavaScript\?/i);
    expect(q1Text).toBeInTheDocument();

    // Expand Question 1
    fireEvent.click(q1Text);

    // Model answer should now be visible
    expect(screen.getByText(/Model Suggested Answer:/i)).toBeInTheDocument();
    expect(screen.getByText(/Both let and const are block-scoped declarations/i)).toBeInTheDocument();

    // Click Mark Interview Prep Reviewed
    const reviewBtn = screen.getAllByRole('button', { name: /Mark Interview Prep Reviewed/i })[0];
    fireEvent.click(reviewBtn);

    expect(screen.getAllByText(/Reviewed ✓/i).length).toBeGreaterThan(0);
  });

  it('runs Checkpoint Quiz and grades with 80% passing threshold', () => {
    renderPlaywrightDay2Page(true);

    // Switch to Quiz tab
    fireEvent.click(screen.getByRole('button', { name: /4\. Checkpoint Quiz/i }));

    expect(screen.getByRole('heading', { level: 2, name: /Day 2 Knowledge Verification Quiz/i })).toBeInTheDocument();

    // Question 1: option C (const)
    fireEvent.click(screen.getByRole('button', { name: /C const/i }));
    // Question 2: option B (false, because strict equality does not coerce...)
    fireEvent.click(screen.getByRole('button', { name: /false, because strict equality does not coerce data types/i }));
    // Question 3: option C ('0')
    fireEvent.click(screen.getByRole('button', { name: /C 0/i }));
    // Question 4: option A (for (const item of items) { ... })
    fireEvent.click(screen.getByRole('button', { name: /for \(const item of items\) { \.\.\. }/i }));
    // Question 5: option B (Parameters)
    fireEvent.click(screen.getByRole('button', { name: /B Parameters/i }));
    // Question 6: option B (The product of a and b via implicit return)
    fireEvent.click(screen.getByRole('button', { name: /The product of a and b via implicit return/i }));
    // Question 7: option C (testScenarios.length)
    fireEvent.click(screen.getByRole('button', { name: /C testScenarios\.length/i }));
    // Question 8: option B (testUser.role)
    fireEvent.click(screen.getByRole('button', { name: /B testUser\.role/i }));
    // Question 9: option B (An object representing the eventual completion...)
    fireEvent.click(screen.getByRole('button', { name: /An object representing the eventual completion or failure/i }));
    // Question 10: option B (To tell JavaScript to pause the async function...)
    fireEvent.click(screen.getByRole('button', { name: /To tell JavaScript to pause the async function until the browser completes/i }));

    // Submit quiz
    const submitQuizBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitQuizBtn);

    // Passed
    expect(screen.getByText(/Score: 10 \/ 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Checkpoint quiz passed!/i).length).toBeGreaterThan(0);
  });

  it('enforces all 5 completion milestones before allowing Day 2 completion', () => {
    renderPlaywrightDay2Page(true);

    // Attempting to mark Day 2 complete without completing milestones
    const markCompleteBtn = screen.getByRole('button', { name: /Mark Day 2 Complete/i });
    fireEvent.click(markCompleteBtn);

    // Warning message appears
    expect(screen.getByText(/Action Required: Please read all 6 topics in "Core Concepts & Walkthrough" before completing Day 2\./i)).toBeInTheDocument();
  });

  it('navigates directly to Day 3 via header link', () => {
    renderPlaywrightDay2Page(true);

    const day3NavBtn = screen.getByRole('link', { name: /Day 3/i });
    expect(day3NavBtn).toBeInTheDocument();
    expect(day3NavBtn).toHaveAttribute('href', '/courses/playwright-automation/day-3');
  });
});
