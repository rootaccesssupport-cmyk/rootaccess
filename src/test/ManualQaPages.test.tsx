import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import { ManualQaProvider } from '../context/ManualQaContext';

import { ManualQaCourseHubPage } from '../pages/manual-qa/ManualQaCourseHubPage';
import { ManualQaDayLessonPage } from '../pages/manual-qa/ManualQaDayLessonPage';
import { SurpriseTestPage } from '../pages/manual-qa/SurpriseTestPage';
import { FinalProjectPage } from '../pages/manual-qa/FinalProjectPage';
import { CourseCertificatePage } from '../pages/manual-qa/CourseCertificatePage';

describe('Manual QA UI Pages Rendering & Integration', () => {
  const renderAppAt = (route: string, isEnrolled: boolean = false) => {
    localStorage.clear();
    if (isEnrolled) {
      const progressData = JSON.stringify({
        completedLessons: [],
        quizScores: {},
        reportedBugs: {},
        enrolledCourses: ['manual-qa-fundamentals'],
      });
      localStorage.setItem('rootaccess_progress_guest', progressData);
      localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    }
    return render(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <ProgressProvider>
            <ManualQaProvider>
              <Routes>
                <Route path="/manual-qa" element={<ManualQaCourseHubPage />} />
                <Route path="/manual-qa/day/:dayNumber" element={<ManualQaDayLessonPage />} />
                <Route path="/manual-qa/surprise-test-1" element={<SurpriseTestPage />} />
                <Route path="/manual-qa/final-assessment" element={<SurpriseTestPage />} />
                <Route path="/manual-qa/final-project" element={<FinalProjectPage />} />
                <Route path="/manual-qa/certificate" element={<CourseCertificatePage />} />
              </Routes>
            </ManualQaProvider>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders the Course Hub page with 5-day roadmap and metadata when enrolled', async () => {
    renderAppAt('/manual-qa', true);

    expect(await screen.findByText('Manual QA in 5 Days')).toBeInTheDocument();
    expect(
      screen.getByText(/Learn Software Testing Through Practical Exercises/i)
    ).toBeInTheDocument();

    // Verify presence of Day 1 and Day 2 cards
    expect(screen.getByText('Day 1: Software Testing Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Day 2: Test Scenarios and Test Case Design')).toBeInTheDocument();

    // Verify Surprise Test 1 gatekeeper card
    expect(
      screen.getByText(/Surprise Test 1: Core Testing & Defect Management Mastery/i)
    ).toBeInTheDocument();

    // Verify Certificate card
    expect(
      screen.getByText(/RootAccess Manual QA Certificate of Completion/i)
    ).toBeInTheDocument();
  });

  it('renders Course Enrollment Required gate on Course Hub when unenrolled', async () => {
    renderAppAt('/manual-qa', false);

    expect(await screen.findByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view full curriculum/i })).toBeInTheDocument();
  });

  it('renders Course Enrollment Required gate when navigating to Day 1 while unenrolled', async () => {
    renderAppAt('/manual-qa/day/1', false);

    expect(await screen.findByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view full curriculum/i })).toBeInTheDocument();
  });

  it('renders Day 1 Lesson page when enrolled', async () => {
    renderAppAt('/manual-qa/day/1', true);

    expect(await screen.findByText('Day 1: Software Testing Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('1. Day Learning Objectives')).toBeInTheDocument();
    expect(screen.getByText(/Core Concepts & Walkthrough/i)).toBeInTheDocument();
    expect(screen.getByText(/Practical Assignment/i)).toBeInTheDocument();
    expect(screen.getByText(/Interview Question Bank/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Checkpoint Quiz/i)).toBeInTheDocument();
  });

  it('renders Course Enrollment Required gate when navigating to Day 2 while unenrolled', async () => {
    renderAppAt('/manual-qa/day/2', false);

    expect(await screen.findByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByText(/Free students can explore the course curriculum/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view full curriculum/i })).toBeInTheDocument();
  });

  it('renders Day 2 lesson directly with advisory recommendation when enrolled but Day 1 incomplete', async () => {
    renderAppAt('/manual-qa/day/2', true);

    expect(await screen.findByText(/Prerequisite Recommendation:/i)).toBeInTheDocument();
    expect(screen.getByText(/You have not completed Day 1 yet/i)).toBeInTheDocument();
  });

  it('renders Course Enrollment Required for Surprise Test 1 when unenrolled', async () => {
    renderAppAt('/manual-qa/surprise-test-1', false);

    expect(await screen.findByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
  });

  it('renders Surprise Test 1 directly with advisory banner when enrolled but Day 3 is incomplete', async () => {
    renderAppAt('/manual-qa/surprise-test-1', true);

    expect(await screen.findByText(/All course assessments are unlocked for flexible learning/i)).toBeInTheDocument();
    expect(screen.getAllByText('Surprise Test 1').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Course Enrollment Required for Final Project when unenrolled', async () => {
    renderAppAt('/manual-qa/final-project', false);

    expect(await screen.findByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
  });

  it('renders Final Project directly with advisory banner when enrolled but prior days incomplete', async () => {
    renderAppAt('/manual-qa/final-project', true);

    expect(await screen.findByText(/All course projects are unlocked for open and flexible learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Final Portfolio Project: E-Commerce Checkout Test Suite/i)).toBeInTheDocument();
  });

  it('renders Certificate locked screen with missing requirements on fresh state', async () => {
    renderAppAt('/manual-qa/certificate');

    expect(await screen.findByText('Certificate of Completion Locked')).toBeInTheDocument();
    expect(screen.getByText('Pending Milestones:')).toBeInTheDocument();
  });
});
