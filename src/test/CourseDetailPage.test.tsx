import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';

describe('CourseDetailPage Component (Phase 4)', () => {
  const renderWithRoute = (slug: string) => {
    return render(
      <MemoryRouter initialEntries={[`/courses/${slug}`]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders course header, outcomes, and syllabus for manual-qa-fundamentals', () => {
    renderWithRoute('manual-qa-fundamentals');

    expect(screen.getByText(/Manual Testing & Defect Life Cycle Masterclass/i)).toBeInTheDocument();
    expect(screen.getByText(/What You Will Master in This Track/i)).toBeInTheDocument();
    expect(screen.getByText(/Curriculum Syllabus/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Software Testing Life Cycle \(STLC\) & Modern QA Workflows/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Manual QA & Defect Life Cycle Certification Quiz/i)).toBeInTheDocument();
  });

  it('renders not found state for invalid course slug', () => {
    renderWithRoute('non-existent-course-slug');

    expect(screen.getByText(/Course Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to dashboard/i })).toBeInTheDocument();
  });
});
