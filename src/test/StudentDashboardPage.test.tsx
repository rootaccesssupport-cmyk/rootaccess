import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StudentDashboardPage } from '../pages/StudentDashboardPage';
import * as AuthContextModule from '../context/AuthContext';

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
        <StudentDashboardPage />
      </BrowserRouter>
    );
  };

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

    // Switch to Curriculum tab
    const curriculumTab = screen.getByRole('button', { name: /curriculum & modules/i });
    fireEvent.click(curriculumTab);
    expect(screen.getByText('Curriculum & Module Progression')).toBeInTheDocument();
    expect(screen.getByText('Module 1: Manual QA & Defect Life Cycle')).toBeInTheDocument();
    expect(screen.getByText('Module 2: SQL & Backend Database Audits')).toBeInTheDocument();

    // Switch to Interview Vault tab
    const interviewTab = screen.getByRole('button', { name: /daily interview scenario/i });
    fireEvent.click(interviewTab);
    expect(screen.getByText(/technical & behavioral interview vault/i)).toBeInTheDocument();

    // Switch to Cohort Enrollment tab
    const enrollmentTab = screen.getByRole('button', { name: /cohort enrollment status/i });
    fireEvent.click(enrollmentTab);
    expect(screen.getByText(/full cohort enrollment & verification/i)).toBeInTheDocument();
    expect(screen.getByText(/support@rootaccess\.org/i)).toBeInTheDocument();
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
});
