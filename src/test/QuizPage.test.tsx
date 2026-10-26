import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QuizPage } from '../pages/QuizPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';

describe('QuizPage Component (Phase 4)', () => {
  const renderQuiz = (courseSlug: string, isEnrolled: boolean = true) => {
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
      <MemoryRouter initialEntries={[`/courses/${courseSlug}/quiz`]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/:courseSlug/quiz" element={<QuizPage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders Course Enrollment Required gate when unenrolled and unlocks on clicking enroll', () => {
    renderQuiz('sql-for-qa-engineers', false);

    expect(screen.getByText('Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in course/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /enroll in course/i }));
    expect(
      screen.getByRole('heading', { name: 'SQL for QA Engineers Certification Quiz' })
    ).toBeInTheDocument();
  });

  it('renders quiz title and all questions for SQL course', () => {
    renderQuiz('sql-for-qa-engineers', true);

    expect(
      screen.getByRole('heading', { name: 'SQL for QA Engineers Certification Quiz' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Which SQL statement will correctly identify orders that have NO matching payments/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/0 of 3 Answered/i)).toBeInTheDocument();
  });

  it('allows answering questions, submitting, and seeing score with technical explanations', () => {
    renderQuiz('sql-for-qa-engineers');

    // Answer Q1: option B (LEFT JOIN ... WHERE payments.id IS NULL)
    const optQ1 = screen.getByText(/SELECT \* FROM orders LEFT JOIN payments ON orders\.id = payments\.order_id WHERE payments\.id IS NULL;/i);
    fireEvent.click(optQ1);

    // Answer Q2: option B (Verify that columns with required business logic are NOT NULL)
    const optQ2 = screen.getByText(/Verify that columns with required business logic/i);
    fireEvent.click(optQ2);

    // Answer Q3: option B (To filter aggregated groups created by GROUP BY)
    const optQ3 = screen.getByText(/To filter aggregated groups created by GROUP BY/i);
    fireEvent.click(optQ3);

    expect(screen.getByText(/All questions completed and ready for evaluation/i)).toBeInTheDocument();

    // Submit quiz
    const submitBtn = screen.getByRole('button', { name: /submit & view results/i });
    fireEvent.click(submitBtn);

    // Expect score and congratulations
    expect(screen.getByText(/Congratulations! You Passed!/i)).toBeInTheDocument();
    expect(screen.getByText(/You scored 3 out of 3 \(100%\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Technical Explanation:/i).length).toBe(3);
  });
});
