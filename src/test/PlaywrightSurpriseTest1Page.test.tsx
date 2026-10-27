import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaywrightSurpriseTest1Page } from '../pages/playwright/PlaywrightSurpriseTest1Page';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import {
  PLAYWRIGHT_SURPRISE_TEST_1_METADATA,
  PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS,
} from '../data/playwrightSurpriseTest1Data';

function renderSurpriseTest1Page(isEnrolled: boolean = true, isDay6Done: boolean = true) {
  if (isEnrolled) {
    const completedLessons = isDay6Done
      ? ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3', 'lesson-playwright-day-4', 'lesson-playwright-day-5', 'lesson-playwright-day-6']
      : ['lesson-playwright-day-1', 'lesson-playwright-day-2', 'lesson-playwright-day-3', 'lesson-playwright-day-4', 'lesson-playwright-day-5'];

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
    <MemoryRouter initialEntries={['/courses/playwright-automation/surprise-test-1']}>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/courses/playwright-automation/surprise-test-1" element={<PlaywrightSurpriseTest1Page />} />
            <Route path="/courses/playwright-automation/day-6" element={<div>Day 6 Page</div>} />
            <Route path="/courses/playwright-automation/day-7" element={<div>Day 7 Page</div>} />
            <Route path="/courses/playwright-automation" element={<div>Course Detail Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Playwright Automation — Day 6 Surprise Assessment 1 Implementation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Enrollment Gate when student is not enrolled in the course', () => {
    renderSurpriseTest1Page(false);

    expect(screen.getByText(/Course Enrollment Required/i)).toBeInTheDocument();
  });

  it('locks assessment when Day 6 is not completed', () => {
    renderSurpriseTest1Page(true, false);

    expect(screen.getByText(/Assessment Locked/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return to Day 6/i })).toBeInTheDocument();
  });

  it('renders assessment metadata, 10 scenario questions, and passing criteria when unlocked', () => {
    renderSurpriseTest1Page(true, true);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(PLAYWRIGHT_SURPRISE_TEST_1_METADATA.title);
    expect(screen.getByText(/Passing Grade: 80% \(8\/10\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Coverage:/i)).toBeInTheDocument();

    // Verify all 10 scenario questions rendered
    expect(PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.length).toBe(10);
    PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.forEach((q) => {
      const firstLine = q.question.split('\n')[0].trim();
      expect(screen.getByText(new RegExp(firstLine.slice(0, 25).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))).toBeInTheDocument();
    });
  });

  it('requires all 10 questions to be answered before submission is enabled', () => {
    renderSurpriseTest1Page(true, true);

    const submitBtn = screen.getByRole('button', { name: /Submit Assessment for Grading/i });
    expect(submitBtn).toBeDisabled();

    // Select Option A (correct answer) for all 10 questions
    PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.forEach((q) => {
      const optText = q.options[0].slice(0, 25);
      const optBtn = screen.getAllByRole('button').find((btn) => btn.textContent?.includes(optText));
      expect(optBtn).toBeDefined();
      fireEvent.click(optBtn!);
    });

    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // Verify passing results
    expect(screen.getByText(/Assessment Passed with High Competency!/i)).toBeInTheDocument();
    expect(screen.getByText(/10 \/ 10 \(100%\)/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Proceed to Day 7/i }).length).toBeGreaterThan(0);
  });
});
