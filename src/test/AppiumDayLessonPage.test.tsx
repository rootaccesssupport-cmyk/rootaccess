import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import { AppiumDayLessonPage } from '../pages/appium/AppiumDayLessonPage';
import { AppiumCourseCertificatePage } from '../pages/appium/AppiumCourseCertificatePage';

describe('Appium Mobile Automation UI Pages & Day Lessons', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderAppiumPage = (path: string, enrolled: boolean = false) => {
    const progressData = JSON.stringify({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: enrolled ? ['appium-mobile-automation'] : [],
    });
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    localStorage.setItem('rootaccess_progress_guest', progressData);

    return render(
      <MemoryRouter initialEntries={[path]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/appium-mobile-automation/day-1" element={<AppiumDayLessonPage />} />
              <Route path="/courses/appium-mobile-automation/day-2" element={<AppiumDayLessonPage />} />
              <Route path="/courses/appium-mobile-automation/day-14" element={<AppiumDayLessonPage />} />
              <Route path="/courses/appium-mobile-automation/day/:dayNumber" element={<AppiumDayLessonPage />} />
              <Route path="/courses/appium-mobile-automation/certificate" element={<AppiumCourseCertificatePage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('1. Renders Day 1 as Free Preview even when user is unenrolled', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-1', false);

    expect(screen.getByText(/Free Preview/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mobile Automation Overview & Appium Fundamentals/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Concepts & Theory/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Mobile Studio/i)).toBeInTheDocument();
  });

  it('2. Renders CourseEnrollmentGate on Day 2 when user is unenrolled', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-2', false);

    expect(screen.getByText(/Enrollment & Payment Required/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Appium Mobile Automation with Java/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Day 1 is a free preview for all learners/i)).toBeInTheDocument();
  });

  it('3. Renders Day 2 lesson successfully when user is enrolled', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-2', true);

    expect(screen.getAllByText(/Environment Setup & Toolchain Configuration/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/Enrollment & Payment Required/i)).not.toBeInTheDocument();
  });

  it('4. Allows switching between tabs: Studio, Challenge, Interview, Quiz', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-1', true);

    // Switch to Studio
    const studioTab = screen.getByRole('button', { name: /Interactive Mobile Studio/i });
    fireEvent.click(studioTab);
    expect(screen.getByText(/Mobile Architecture Classifier & Strategy Planner/i)).toBeInTheDocument();

    // Switch to Challenge
    const challengeTab = screen.getByRole('button', { name: /Hands-on Challenge/i });
    fireEvent.click(challengeTab);
    expect(screen.getByText(/Independent Challenge/i)).toBeInTheDocument();

    // Switch to Interview Prep
    const interviewTab = screen.getByRole('button', { name: /Interview Prep/i });
    fireEvent.click(interviewTab);
    expect(screen.getByText(/Real-World Interview Questions/i)).toBeInTheDocument();

    // Switch to Quiz
    const quizTab = screen.getByRole('button', { name: /Checkpoint Quiz/i });
    fireEvent.click(quizTab);
    expect(screen.getByText(/Knowledge Check/i)).toBeInTheDocument();
  });

  it('5. Quiz renders with zero pre-filled answers and validates submission', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-1', true);

    // Navigate to Quiz tab
    fireEvent.click(screen.getByRole('button', { name: /Checkpoint Quiz/i }));

    const submitBtn = screen.getByRole('button', { name: /Submit Answers \(0\/5 Answered\)/i });
    expect(submitBtn).toBeDisabled();

    // Select option A for question 1
    const optionA = screen.getByRole('button', { name: /W3C WebDriver Protocol over HTTP\/JSON/i });
    fireEvent.click(optionA);

    expect(screen.getByRole('button', { name: /Submit Answers \(1\/5 Answered\)/i })).toBeDisabled();
  });

  it('6. Ask Roo AI button opens the dedicated Roo AI Assistant Modal', () => {
    renderAppiumPage('/courses/appium-mobile-automation/day-1', true);

    const askRooBtn = screen.getByRole('button', { name: /Ask Roo AI/i });
    fireEvent.click(askRooBtn);

    expect(screen.getByRole('dialog', { name: /Roo AI Assistant/i })).toBeInTheDocument();
    expect(screen.getByText(/Roo • Mobile Automation AI/i)).toBeInTheDocument();
    expect(screen.getByText(/UiAutomator2 vs DesiredCapabilities/i)).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close Assistant/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog', { name: /Roo AI Assistant/i })).not.toBeInTheDocument();
  });

  it('7. Certificate page shows locked state when requirements are missing', () => {
    renderAppiumPage('/courses/appium-mobile-automation/certificate', true);

    expect(screen.getByText(/Verified Credential Locked/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Requirements \(14\):/i)).toBeInTheDocument();
  });

  it('8. Certificate page unlocks when all 14 days are marked completed', () => {
    const allCompleted = Array.from({ length: 14 }, (_, i) => `appium-day-${i + 1}`);
    const progressData = JSON.stringify({
      completedLessons: allCompleted,
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: ['appium-mobile-automation'],
    });
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    localStorage.setItem('rootaccess_progress_guest', progressData);
    localStorage.setItem('rootaccess_appium_capstone_submitted', 'true');

    render(
      <MemoryRouter initialEntries={['/courses/appium-mobile-automation/certificate']}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/appium-mobile-automation/certificate" element={<AppiumCourseCertificatePage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText(/Verified Credential Locked/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Certificate of Competency & Mastery/i)).toBeInTheDocument();
    expect(screen.getByText(/Print or Save PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/UiAutomator2Options/i)).toBeInTheDocument();
  });
});
