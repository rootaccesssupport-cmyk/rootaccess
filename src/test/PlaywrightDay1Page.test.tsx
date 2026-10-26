import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightDay1LessonPage } from '../pages/playwright/PlaywrightDay1LessonPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';

function renderPlaywrightDay1Page(isEnrolled: boolean = true) {
  if (isEnrolled) {
    const progressData = JSON.stringify({
      completedLessons: [],
      lessonNotes: {},
      quizScores: {},
      enrolledCourses: ['playwright-automation'],
    });
    localStorage.setItem('rootaccess_progress_guest', progressData);
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
  }

  return render(
    <MemoryRouter initialEntries={['/courses/playwright-automation/day-1']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/day-1" element={<PlaywrightDay1LessonPage />} />
            <Route path="/courses/playwright-automation" element={<PlaywrightDay1LessonPage />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation with JavaScript — Day 1 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Day 1 title, badge metadata, breadcrumbs, and real PDF download button', () => {
    renderPlaywrightDay1Page();

    // Check title & badge
    expect(screen.getByRole('heading', { level: 1, name: /Automation Testing and Playwright Fundamentals/i })).toBeInTheDocument();
    expect(screen.getByText(/Day 1 of 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated: 2–3 Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Language: JavaScript \(\.js\)/i)).toBeInTheDocument();

    // Check breadcrumb
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation Testing')).toBeInTheDocument();

    // Check real PDF link
    const downloadBtn = screen.getByRole('link', { name: /Download Day 1 Notes \(PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/playwright-js/day-1-automation-testing-and-playwright-fundamentals.pdf');
  });

  it('renders five lesson sections and supports sequential topic navigation', () => {
    renderPlaywrightDay1Page();

    // Check 5 topic selectors
    expect(screen.getByRole('button', { name: /Topic 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic 5/i })).toBeInTheDocument();

    // Topic 1 is active by default
    expect(screen.getByRole('heading', { level: 2, name: /Topic 1: Introduction to Automation Testing/i })).toBeInTheDocument();

    // Click "Mark as Read & Continue" to advance to Topic 2
    const continueBtn = screen.getByRole('button', { name: /Mark as Read & Continue/i });
    fireEvent.click(continueBtn);

    // Topic 2 is now displayed
    expect(screen.getByRole('heading', { level: 2, name: /Topic 2: What Is Playwright\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Visual Workflow: How Playwright Interacts with a Web App/i)).toBeInTheDocument();
  });

  it('displays pure JavaScript code example without requiring TypeScript in Topic 4', () => {
    renderPlaywrightDay1Page();

    // Navigate to Topic 4
    fireEvent.click(screen.getByRole('button', { name: /Topic 4/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 4: Understanding the Automation Testing Workflow/i })).toBeInTheDocument();

    // Verify .js code snippet is present
    expect(screen.getAllByText(/login\.spec\.js/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/const { test, expect } = require\('@playwright\/test'\);/i)).toBeInTheDocument();
  });

  it('renders 20-day roadmap in Topic 5 with Day 1 marked as Active Day', () => {
    renderPlaywrightDay1Page();

    // Navigate to Topic 5
    fireEvent.click(screen.getByRole('button', { name: /Topic 5/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Topic 5: Tools and Course Roadmap/i })).toBeInTheDocument();

    expect(screen.getByText(/20-Day Playwright Automation Course Roadmap/i)).toBeInTheDocument();
    expect(screen.getByText('Active Day')).toBeInTheDocument();
    expect(screen.getByText(/Day 2 — JavaScript Essentials for Test Automation/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 20 — Real-World Portfolio & Certification Exam/i)).toBeInTheDocument();
  });

  it('allows adding and editing rows in Practical Assignment and validates submission', () => {
    renderPlaywrightDay1Page();

    // Switch to Practical Assignment tab
    fireEvent.click(screen.getByRole('button', { name: /Practical Assignment/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Identify Automation Opportunities/i })).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Submit Assignment/i });

    // Attempt submit with empty priorities -> triggers validation
    fireEvent.click(submitBtn);
    expect(screen.getByText(/Please identify your 3 high-priority regression scenarios/i)).toBeInTheDocument();

    // Fill in top 3 priorities and risk analysis
    fireEvent.change(screen.getByPlaceholderText(/1\. Scenario A/i), {
      target: { value: '1. Login\n2. Cart checkout\n3. Payment' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Explain how test flakiness/i), {
      target: { value: 'Flaky tests cause alert fatigue and allow bugs into production.' },
    });

    // Fill in Row 3 scenario fields
    const initialFeatures = screen.getAllByPlaceholderText(/e\.g\. Checkout/i);
    const initialScenarios = screen.getAllByPlaceholderText(/Describe the user action/i);
    const initialReasons = screen.getAllByPlaceholderText(/Why automate or keep manual/i);

    fireEvent.change(initialFeatures[2], {
      target: { value: 'Checkout' },
    });
    fireEvent.change(initialScenarios[2], {
      target: { value: 'User enters card details and completes purchase' },
    });
    fireEvent.change(initialReasons[2], {
      target: { value: 'High priority business flow with deterministic math' },
    });

    // Add a new row and fill its fields
    const addRowBtn = screen.getByRole('button', { name: /Add Scenario Row/i });
    fireEvent.click(addRowBtn);

    const featureInputs = screen.getAllByPlaceholderText(/e\.g\. Checkout/i);
    const scenarioInputs = screen.getAllByPlaceholderText(/Describe the user action/i);
    const reasonInputs = screen.getAllByPlaceholderText(/Why automate or keep manual/i);

    fireEvent.change(featureInputs[featureInputs.length - 1], {
      target: { value: 'User Account' },
    });
    fireEvent.change(scenarioInputs[scenarioInputs.length - 1], {
      target: { value: 'User requests password reset' },
    });
    fireEvent.change(reasonInputs[reasonInputs.length - 1], {
      target: { value: 'Predictable transactional flow' },
    });

    // Submit assignment
    fireEvent.click(submitBtn);

    // Shows evaluation feedback
    expect(screen.getByText(/Practical Assignment successfully evaluated/i)).toBeInTheDocument();
  });

  it('toggles suggested answers in Interview Question Bank', () => {
    renderPlaywrightDay1Page();

    // Switch to Interview tab
    fireEvent.click(screen.getByRole('button', { name: /Interview Question Bank/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Playwright Fundamentals Interview Bank/i })).toBeInTheDocument();

    // Answers are hidden initially
    expect(screen.queryByText(/Suggested Model Answer:/i)).not.toBeInTheDocument();

    // Click on Question 1 accordion
    const q1Button = screen.getByRole('button', { name: /What is software test automation\?/i });
    fireEvent.click(q1Button);

    // Answer is now visible
    expect(screen.getByText(/Suggested Model Answer:/i)).toBeInTheDocument();

    // Mark Interview Reviewed button works
    const reviewBtn = screen.getByRole('button', { name: /Mark Interview Prep Reviewed/i });
    fireEvent.click(reviewBtn);
    expect(screen.getByText(/Marked as Reviewed/i)).toBeInTheDocument();
  });

  it('scores the 10-question quiz, displays technical explanations, and supports retry', () => {
    renderPlaywrightDay1Page();

    // Switch to Quiz tab
    fireEvent.click(screen.getByRole('button', { name: /Daily Checkpoint Quiz/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Day 1 Checkpoint Quiz/i })).toBeInTheDocument();

    // Select answers for all 10 questions
    fireEvent.click(screen.getByText(/To use scripts and tools to execute repetitive tests rapidly/i));
    fireEvent.click(screen.getByText(/A checkout payment calculation test with 50 tax and coupon combinations/i));
    fireEvent.click(screen.getByText('Microsoft'));
    fireEvent.click(screen.getByText(/Chromium, Firefox, and WebKit/i));
    fireEvent.click(screen.getByText(/Headed mode opens a visible browser UI window, while headless runs silently in system memory/i));
    fireEvent.click(screen.getByText(/It automatically checks element actionability \(attached, visible, stable, enabled\)/i));
    fireEvent.click(screen.getByText(/Playwright connects directly to browser engines over a high-speed WebSocket connection/i));
    fireEvent.click(screen.getByText(/A lightweight, isolated incognito browser session with independent cookies and cache/i));
    fireEvent.click(screen.getByText(/Understand requirements, identify test scenarios, and select appropriate automation candidates/i));
    fireEvent.click(screen.getByText(/Investigate logs, traces, and screenshots to distinguish whether the failure is an application bug/i));

    // Submit quiz
    const submitQuizBtn = screen.getByRole('button', { name: /Submit Quiz for Scoring/i });
    fireEvent.click(submitQuizBtn);

    // Check score banner: 10 / 10 • PASSED
    expect(screen.getByText(/Score: 10 \/ 10 \(100%\) • PASSED/i)).toBeInTheDocument();

    // Check explanations are visible for all 10 questions
    expect(screen.getAllByText(/Explanation:/i).length).toBe(10);

    // Test retry
    const retryButtons = screen.getAllByRole('button', { name: /Retry Quiz/i });
    fireEvent.click(retryButtons[0]);
    expect(screen.queryByText(/Score: 10 \/ 10/i)).not.toBeInTheDocument();
  });

  it('enforces all 4 completion conditions before marking Day 1 complete', () => {
    renderPlaywrightDay1Page();

    const completeDay1Btn = screen.getByRole('button', { name: /Mark Day 1 Complete/i });

    // 1. Attempting complete before reading 5 topics triggers warning
    fireEvent.click(completeDay1Btn);
    expect(screen.getByText(/Action Required: Please read all 5 topics/i)).toBeInTheDocument();

    // Read all 5 topics
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(`Topic ${i + 1}\\b`, 'i') }));
      const readBtn = screen.getByRole('button', { name: /Mark as Read|Mark Topic as Read/i });
      fireEvent.click(readBtn);
    }

    // 2. Attempting complete before assignment triggers warning
    fireEvent.click(completeDay1Btn);
    expect(screen.getByText(/Action Required: Please complete and submit your Practical Assignment/i)).toBeInTheDocument();

    // Submit assignment
    fireEvent.click(screen.getByRole('button', { name: /Practical Assignment/i }));
    fireEvent.change(screen.getByPlaceholderText(/1\. Scenario A/i), {
      target: { value: '1. Login\n2. Cart checkout\n3. Payment' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Explain how test flakiness/i), {
      target: { value: 'Flaky tests cause alert fatigue and allow bugs into production.' },
    });
    const initialFeatures = screen.getAllByPlaceholderText(/e\.g\. Checkout/i);
    const initialScenarios = screen.getAllByPlaceholderText(/Describe the user action/i);
    const initialReasons = screen.getAllByPlaceholderText(/Why automate or keep manual/i);

    fireEvent.change(initialFeatures[2], {
      target: { value: 'Checkout' },
    });
    fireEvent.change(initialScenarios[2], {
      target: { value: 'User enters card details and completes purchase' },
    });
    fireEvent.change(initialReasons[2], {
      target: { value: 'High priority business flow with deterministic math' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Assignment/i }));

    // 3. Attempting complete before interview review triggers warning
    fireEvent.click(completeDay1Btn);
    expect(screen.getByText(/Action Required: Please review the Interview Question Bank/i)).toBeInTheDocument();

    // Review interview
    fireEvent.click(screen.getByRole('button', { name: /Interview Question Bank/i }));
    fireEvent.click(screen.getByRole('button', { name: /Mark Interview Prep Reviewed/i }));

    // 4. Attempting complete before quiz triggers warning
    fireEvent.click(completeDay1Btn);
    expect(screen.getByText(/Action Required: You must pass the Day 1 Checkpoint Quiz/i)).toBeInTheDocument();
  });

  it('renders enrollment required access gate if user is not enrolled in course', () => {
    renderPlaywrightDay1Page(false);

    expect(screen.getByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view full curriculum/i })).toHaveAttribute(
      'href',
      '/courses/playwright-automation'
    );
  });
});

