import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import { SqlDayLessonPage } from '../pages/sql/SqlDayLessonPage';
import { ApiDayLessonPage } from '../pages/api/ApiDayLessonPage';

describe('SQL and API Course Day Lesson Routing', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSqlDay = (path: string) => {
    const progressData = JSON.stringify({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: ['sql-for-qa-engineers'],
    });
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    localStorage.setItem('rootaccess_progress_guest', progressData);

    return render(
      <MemoryRouter initialEntries={[path]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/sql-for-qa-engineers/day-1" element={<SqlDayLessonPage />} />
              <Route path="/courses/sql-for-qa-engineers/day-2" element={<SqlDayLessonPage />} />
              <Route path="/courses/sql-for-qa-engineers/day/:dayNumber" element={<SqlDayLessonPage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  const renderApiDay = (path: string) => {
    const progressData = JSON.stringify({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: ['api-testing-postman'],
    });
    localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
    localStorage.setItem('rootaccess_progress_guest', progressData);

    return render(
      <MemoryRouter initialEntries={[path]}>
        <AuthProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/courses/api-testing-postman/day-1" element={<ApiDayLessonPage />} />
              <Route path="/courses/api-testing-postman/day-2" element={<ApiDayLessonPage />} />
              <Route path="/courses/api-testing-postman/day/:dayNumber" element={<ApiDayLessonPage />} />
            </Routes>
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders Day 1 for SQL course when navigating to /courses/sql-for-qa-engineers/day-1', async () => {
    renderSqlDay('/courses/sql-for-qa-engineers/day-1');

    expect(await screen.findByText(/Day 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/SQL Foundations and Basic Queries/i)).toBeInTheDocument();
    expect(screen.getByText(/Concept Modules/i)).toBeInTheDocument();
    expect(screen.getByText(/Hands-on Sandbox/i)).toBeInTheDocument();
  });

  it('renders Day 2 for SQL course when navigating to /courses/sql-for-qa-engineers/day-2', async () => {
    renderSqlDay('/courses/sql-for-qa-engineers/day-2');

    expect(await screen.findByText(/Day 2 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Aggregations, Grouping, and Joins/i)).toBeInTheDocument();
  });

  it('renders Day 1 for API testing course when navigating to /courses/api-testing-postman/day-1', async () => {
    renderApiDay('/courses/api-testing-postman/day-1');

    expect(await screen.findByText(/Day 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/API Fundamentals and HTTP/i)).toBeInTheDocument();
    expect(screen.getByText(/Concept Modules/i)).toBeInTheDocument();
    expect(screen.getByText(/Hands-on Postman Studio/i)).toBeInTheDocument();
  });
});
