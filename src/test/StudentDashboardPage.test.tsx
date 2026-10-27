import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StudentDashboardPage } from '../pages/StudentDashboardPage';
import * as AuthContextModule from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';

describe('StudentDashboardPage Component (Phase 3)', () => {
  const mockSignOut = vi.fn();
  const mockRefreshProfile = vi.fn();

  const renderComponent = () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: {
        id: 'student-id-123',
        email: 'alex.student@example.com',
        user_metadata: { full_name: 'Alex Student' },
      } as any,
      profile: {
        id: 'student-id-123',
        full_name: 'Alex Student',
        email: 'alex.student@example.com',
      },
      session: { access_token: 'valid-token' } as any,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: mockSignOut,
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: mockRefreshProfile,
    });

    return render(
      <BrowserRouter>
        <ProgressProvider>
          <StudentDashboardPage />
        </ProgressProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    window.history.pushState({}, '', '/app');
    localStorage.clear();
    localStorage.setItem(
      'rootaccess_progress_student-id-123',
      JSON.stringify({
        enrolledCourses: ['manual-qa-fundamentals'],
        completedLessons: [],
        quizScores: {},
        reportedBugs: {},
      })
    );
  });

  it('renders student welcome greeting and required text', () => {
    renderComponent();

    expect(screen.getByText(/welcome back, alex student!/i)).toBeInTheDocument();
    expect(screen.getByText('Your learning journey starts here.')).toBeInTheDocument();
    expect(screen.getAllByText(/qa & software testing engineer/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders dashboard metrics counters', () => {
    renderComponent();

    expect(screen.getByText('Lessons Completed')).toBeInTheDocument();
    expect(screen.getByText('Defect Logged')).toBeInTheDocument();
    expect(screen.getByText('Quizzes Answered')).toBeInTheDocument();
    expect(screen.getByText('QA Readiness Level')).toBeInTheDocument();
  });

  it('reveals and hides the daily interview scenario model answer', () => {
    renderComponent();

    const revealBtn = screen.getByRole('button', { name: /reveal model answer & analysis/i });
    expect(revealBtn).toBeInTheDocument();

    // Click to reveal
    fireEvent.click(revealBtn);
    expect(screen.getByText(/model technical answer rubric/i)).toBeInTheDocument();

    // Click to hide
    const hideBtn = screen.getByRole('button', { name: /hide model answer/i });
    fireEvent.click(hideBtn);
    expect(screen.queryByText(/model technical answer rubric/i)).not.toBeInTheDocument();
  });

  it('switches between dashboard tabs', () => {
    renderComponent();

    // Verify initial tab is Enrolled Courses
    expect(screen.getByText(/my enrolled courses/i)).toBeInTheDocument();

    // Switch to Interview Vault tab
    const interviewTab = screen.getByRole('button', { name: /daily interview scenario/i });
    fireEvent.click(interviewTab);
    expect(screen.getByText(/interview vault/i)).toBeInTheDocument();

    // Switch to Explore All Courses (Catalog) tab
    const catalogTab = screen.getByRole('button', { name: /explore all courses/i });
    fireEvent.click(catalogTab);
    expect(screen.getByText('Course Catalog & Active Enrollments')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search courses/i)).toBeInTheDocument();

    // Switch back to Enrolled Courses tab
    const enrolledTab = screen.getByRole('button', { name: /enrolled courses/i });
    fireEvent.click(enrolledTab);
    expect(screen.getByText(/my enrolled courses/i)).toBeInTheDocument();
  });

  it('opens profile editor modal and allows full name editing', async () => {
    renderComponent();

    const editBtn = screen.getByTitle('Edit profile');
    fireEvent.click(editBtn);

    expect(screen.getByText('Student Profile')).toBeInTheDocument();
    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toHaveValue('Alex Student');

    fireEvent.change(nameInput, { target: { value: 'Alexander Student' } });
    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(saveBtn);

    expect(await screen.findByText(/profile name updated successfully/i)).toBeInTheDocument();
  });

  it('calls signOut when logout button is clicked', async () => {
    mockSignOut.mockResolvedValueOnce({ success: true });
    renderComponent();

    const logoutBtn = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });

  it('displays Playwright Automation course in Explore All Courses catalog and allows exploration', () => {
    renderComponent();

    // Switch to Catalog
    const catalogTab = screen.getByRole('button', { name: /explore all courses/i });
    fireEvent.click(catalogTab);

    expect(screen.getByText('Course Catalog & Active Enrollments')).toBeInTheDocument();
    expect(screen.getByText('Playwright Automation with JavaScript + AI')).toBeInTheDocument();
    expect(screen.getByText('20-Day Automation Masterclass')).toBeInTheDocument();
  });

  it('filters courses by search query and category pills in catalog tab', () => {
    renderComponent();

    // Switch to Catalog
    const catalogTab = screen.getByRole('button', { name: /explore all courses/i });
    fireEvent.click(catalogTab);

    // Search for "DevOps"
    const searchInput = screen.getByPlaceholderText(/search courses, skills, or topics/i);
    fireEvent.change(searchInput, { target: { value: 'DevOps' } });

    expect(screen.getByText('DevOps Engineering: Fundamentals to Production Projects')).toBeInTheDocument();
    expect(screen.queryByText('Playwright Automation with JavaScript + AI')).not.toBeInTheDocument();

    // Clear search
    const clearBtn = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearBtn);

    expect(screen.getByText('Playwright Automation with JavaScript + AI')).toBeInTheDocument();

    // Filter by "Test Automation" category pill
    const autoPill = screen.getByRole('button', { name: 'Test Automation' });
    fireEvent.click(autoPill);

    expect(screen.getByText('Playwright Automation with JavaScript + AI')).toBeInTheDocument();
    expect(screen.queryByText('SQL & Backend Database Audits for QA')).not.toBeInTheDocument();
  });

  it('renders Defect Lab quick link on enrolled QA course cards', () => {
    renderComponent();

    const defectLabLink = screen.getByRole('link', { name: /defect lab/i });
    expect(defectLabLink).toBeInTheDocument();
    expect(defectLabLink).toHaveAttribute('href', '/simulator');
  });

  it('renders friendly empty state when student has no active enrollments', () => {
    localStorage.clear();
    localStorage.setItem(
      'rootaccess_progress_student-id-123',
      JSON.stringify({
        enrolledCourses: [],
        completedLessons: [],
        quizScores: {},
        reportedBugs: {},
      })
    );

    renderComponent();

    // Enrolled courses tab should show empty state
    expect(screen.getByText('No Enrolled Courses Yet')).toBeInTheDocument();

    // Switch to Interview Tab
    const interviewTab = screen.getByRole('button', { name: /daily interview scenario/i });
    fireEvent.click(interviewTab);

    expect(screen.getByText('No Active Enrolled Courses Found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse course catalog & enroll/i })).toBeInTheDocument();
  });
});
