import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DevOpsProvider } from '../context/DevOpsContext';
import { ProgressProvider } from '../context/ProgressContext';
import { DevOpsCourseOverviewPage } from '../pages/devops/DevOpsCourseOverviewPage';
import { DevOpsDay1LessonPage } from '../pages/devops/DevOpsDay1LessonPage';
import { DevOpsDay2LessonPage } from '../pages/devops/DevOpsDay2LessonPage';
import { DevOpsDay3LessonPage } from '../pages/devops/DevOpsDay3LessonPage';
import * as AuthContextModule from '../context/AuthContext';

const mockUseAuth = () => {
  vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
    user: {
      id: 'test-devops-student',
      email: 'student@example.com',
      user_metadata: { full_name: 'Test Student' },
    } as any,
    profile: {
      id: 'test-devops-student',
      full_name: 'Test Student',
      email: 'student@example.com',
    },
    session: { access_token: 'mock-token' } as any,
    loading: false,
    isConfigured: true,
    signUp: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updatePassword: vi.fn(),
    refreshProfile: vi.fn(),
  });
};

const renderWithProviders = (ui: React.ReactElement, isEnrolled: boolean = true) => {
  localStorage.clear();
  if (isEnrolled) {
    const progressData = JSON.stringify({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: ['devops-engineering'],
    });
    localStorage.setItem('rootaccess_progress_test-devops-student', progressData);
    localStorage.setItem(
      'rootaccess_devops_progress_test-devops-student',
      JSON.stringify({
        userId: 'test-devops-student',
        enrolled: true,
        lastActiveDay: 1,
        days: {},
      })
    );
  }
  return render(
    <BrowserRouter>
      <ProgressProvider>
        <DevOpsProvider>
          {ui}
        </DevOpsProvider>
      </ProgressProvider>
    </BrowserRouter>
  );
};

describe('DevOpsCourseOverviewPage', () => {
  it('renders course overview title, stats, and 36-day curriculum roadmap', () => {
    mockUseAuth();
    renderWithProviders(<DevOpsCourseOverviewPage />, false);

    // Header & metadata
    expect(screen.getByText(/DevOps Engineering — From Fundamentals to Practical Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/36 Days Total/i)).toBeInTheDocument();
    expect(screen.getByText(/Module 1 Active/i)).toBeInTheDocument();

    // Module 1 implemented days
    expect(screen.getByText(/Understanding DevOps and the Software Delivery Lifecycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Linux Fundamentals and Command-Line Navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/Linux Files, Permissions, Processes, Logs, and Troubleshooting/i)).toBeInTheDocument();

    // Upcoming modules
    expect(screen.getByText(/Module 2 — Networking Essentials/i)).toBeInTheDocument();
    expect(screen.getByText(/Module 3 — Git and Collaboration/i)).toBeInTheDocument();
  });
});

describe('DevOpsDay1LessonPage', () => {
  it('renders enrollment gate when unenrolled and unlocks upon enrolling', () => {
    mockUseAuth();
    renderWithProviders(<DevOpsDay1LessonPage />, false);

    // Shows enrollment gate
    expect(screen.getByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();

    // Clicking enroll in course unlocks the lesson
    fireEvent.click(screen.getByRole('button', { name: /enroll in course/i }));
    expect(screen.getByText('Understanding DevOps and the Software Delivery Lifecycle')).toBeInTheDocument();
  });

  it('renders Day 1 topics and switches to simulations and checkpoints tabs when enrolled', () => {
    mockUseAuth();
    renderWithProviders(<DevOpsDay1LessonPage />, true);

    // Title and topic
    expect(screen.getByText('Understanding DevOps and the Software Delivery Lifecycle')).toBeInTheDocument();
    expect(screen.getAllByText(/What Problem Does DevOps Solve\?/i).length).toBeGreaterThanOrEqual(1);

    // Switch to Interactive Simulations Tab
    const simTab = screen.getByText(/2. Interactive Simulations/i);
    fireEvent.click(simTab);
    expect(screen.getByText(/The Release Room/i)).toBeInTheDocument();

    // Switch to Checkpoints Tab
    const checkTab = screen.getByText(/3. Checkpoints/i);
    fireEvent.click(checkTab);
    expect(screen.getByText(/Knowledge Checkpoints/i)).toBeInTheDocument();
  });
});

describe('DevOpsDay2LessonPage', () => {
  it('renders Day 2 topics and switches to virtual terminal and command labs when enrolled', () => {
    mockUseAuth();
    renderWithProviders(<DevOpsDay2LessonPage />, true);

    expect(screen.getByText('Linux Fundamentals and Command-Line Navigation')).toBeInTheDocument();

    // Switch to Interactive Labs Tab
    const labTab = screen.getByText(/2. Terminal & Filesystem Lab/i);
    fireEvent.click(labTab);
    expect(screen.getByText(/Linux Directory Structure Explorer/i)).toBeInTheDocument();
  });
});

describe('DevOpsDay3LessonPage', () => {
  it('renders Day 3 topics and switches to diagnostic labs when enrolled', () => {
    mockUseAuth();
    renderWithProviders(<DevOpsDay3LessonPage />, true);

    expect(screen.getByText('Linux Permissions, Processes, Logs, and Troubleshooting')).toBeInTheDocument();

    // Switch to Diagnostic Labs Tab
    const diagTab = screen.getByText(/2. Diagnostic & Permission Labs/i);
    fireEvent.click(diagTab);
    expect(screen.getByText(/Linux Permission Builder & Octal Calculator/i)).toBeInTheDocument();
  });
});
