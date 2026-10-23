import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LessonViewerPage } from '../pages/LessonViewerPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';

describe('LessonViewerPage Component (Phase 4)', () => {
  const renderLesson = (courseSlug: string, lessonSlug: string) => {
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

  it('renders lesson title, content sections, takeaways, and practical checklist', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals');

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
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals');

    const checklistItem = screen.getByText(/Read acceptance criteria thoroughly before writing test steps/i);
    expect(checklistItem).toBeInTheDocument();
    expect(checklistItem).not.toHaveClass('line-through');

    // Click checklist button
    fireEvent.click(checklistItem.closest('button')!);
    expect(checklistItem).toHaveClass('line-through');
  });

  it('allows toggling completion state via Mark as Done button', () => {
    renderLesson('manual-qa-fundamentals', 'stlc-fundamentals');

    // In default seed, stlc-fundamentals is completed, so it shows 'Completed'
    const completionBtn = screen.getByRole('button', { name: /completed/i });
    expect(completionBtn).toBeInTheDocument();

    // Toggle off
    fireEvent.click(completionBtn);
    expect(screen.getByRole('button', { name: /mark as done/i })).toBeInTheDocument();
  });
});
