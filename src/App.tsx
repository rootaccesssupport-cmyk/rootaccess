import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicOnlyRoute } from './components/auth/PublicOnlyRoute';

import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { HomePage } from './pages/HomePage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonViewerPage } from './pages/LessonViewerPage';
import { QuizPage } from './pages/QuizPage';
import { DefectSimulatorPage } from './pages/DefectSimulatorPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            {/* Public Homepage for Phase 2 */}
            <Route path="/" element={<HomePage />} />

            {/* Public authentication routes (redirect to /app if already logged in) */}
            <Route
              path="/signup"
              element={
                <PublicOnlyRoute>
                  <SignUpPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicOnlyRoute>
                  <ForgotPasswordPage />
                </PublicOnlyRoute>
              }
            />

            {/* Password Reset route (handles password recovery links from Supabase) */}
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Route: Student Dashboard (Phase 3) */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <StudentDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<Navigate to="/app" replace />} />

            {/* Protected Routes: Learning Paths, Lessons, Quizzes & Simulator (Phase 4) */}
            <Route
              path="/courses/:courseSlug"
              element={
                <ProtectedRoute>
                  <CourseDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseSlug/lessons/:lessonSlug"
              element={
                <ProtectedRoute>
                  <LessonViewerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseSlug/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/simulator"
              element={
                <ProtectedRoute>
                  <DefectSimulatorPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
