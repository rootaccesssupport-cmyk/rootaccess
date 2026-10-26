import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LessonViewerPage } from '../pages/LessonViewerPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';

describe('LessonViewerPage Component (Phase 4)', () => {
  const renderLesson = (courseSlug: string, lessonSlug: string, isEnrolled: boolean = true) => {
    localStorage.clear();
    if (isEnrolled) {
      const progressData = JSON.stringify({
        completedLessons: [],
        quizScores: {},
        reportedBugs: {},
        enrolledCourses: [courseSlug],
      });
      localStorage.setItem('rootaccess_progress_guest', progressData);
      localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    }
    return render(
      <MemoryRouter initialEntries={[`/courses/${courseSlug}/lessons/${lessonSlug}`]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route
                path="/courses/:courseSlug/lessons/:lessonSlug"
                element={<LessonViewerPage />}
              />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders Course Enrollment Required gate when unenrolled and unlocks upon enrolling', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals', false);

    expect(screen.getByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view full curriculum/i })).toBeInTheDocument();

    // Click enroll
    fireEvent.click(screen.getByRole('button', { name: /enroll in course/i }));
    expect(
      screen.getByText('Software Testing Life Cycle (STLC) & Modern QA Workflows')
    ).toBeInTheDocument();
  });

  it('renders lesson title, content sections, takeaways, and practical checklist when enrolled', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals', true);

    expect(
      screen.getByText('Software Testing Life Cycle (STLC) & Modern QA Workflows')
    ).toBeInTheDocument();
    expect(
      screen.getByText('1. What is the Software Testing Life Cycle (STLC)?')
    ).toBeInTheDocument();
    expect(screen.getByText(/Key Takeaways for QA Testers/i)).toBeInTheDocument();
    expect(screen.getByText(/Practical QA Execution Checklist/i)).toBeInTheDocument();
  });

  it('allows checking checklist items interactively', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals', true);

    const checklistItem = screen.getByText(/Read acceptance criteria thoroughly before writing test steps/i);
    expect(checklistItem).toBeInTheDocument();
    expect(checklistItem).not.toHaveClass('line-through');

    // Click checklist button
    fireEvent.click(checklistItem.closest('button')!);
    expect(checklistItem).toHaveClass('line-through');
  });

  it('allows toggling completion state via Mark as Done button', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals', true);

    // On clean initial state, lesson is not completed, so it shows 'Mark as Done'
    const markDoneBtn = screen.getByRole('button', { name: /mark as done/i });
    expect(markDoneBtn).toBeInTheDocument();

    // Toggle to completed
    fireEvent.click(markDoneBtn);
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });
});
