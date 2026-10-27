import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ManualQaProvider } from './context/ManualQaContext';
import { DevOpsProvider } from './context/DevOpsContext';
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

import { ManualQaCourseHubPage } from './pages/manual-qa/ManualQaCourseHubPage';
import { ManualQaDayLessonPage } from './pages/manual-qa/ManualQaDayLessonPage';
import { SurpriseTestPage } from './pages/manual-qa/SurpriseTestPage';
import { FinalProjectPage } from './pages/manual-qa/FinalProjectPage';
import { CourseCertificatePage } from './pages/manual-qa/CourseCertificatePage';
import { PlaywrightDay1LessonPage } from './pages/playwright/PlaywrightDay1LessonPage';
import { PlaywrightDay2LessonPage } from './pages/playwright/PlaywrightDay2LessonPage';
import { PlaywrightDay3LessonPage } from './pages/playwright/PlaywrightDay3LessonPage';
import { PlaywrightDay4LessonPage } from './pages/playwright/PlaywrightDay4LessonPage';
import { PlaywrightDay5LessonPage } from './pages/playwright/PlaywrightDay5LessonPage';
import { PlaywrightDay6LessonPage } from './pages/playwright/PlaywrightDay6LessonPage';
import { PlaywrightSurpriseTest1Page } from './pages/playwright/PlaywrightSurpriseTest1Page';
import { PlaywrightDay7LessonPage } from './pages/playwright/PlaywrightDay7LessonPage';
import { PlaywrightDay8LessonPage } from './pages/playwright/PlaywrightDay8LessonPage';

import { DevOpsCourseOverviewPage } from './pages/devops/DevOpsCourseOverviewPage';
import { DevOpsDay1LessonPage } from './pages/devops/DevOpsDay1LessonPage';
import { DevOpsDay2LessonPage } from './pages/devops/DevOpsDay2LessonPage';
import { DevOpsDay3LessonPage } from './pages/devops/DevOpsDay3LessonPage';

import { ScrollToTop } from './components/common/ScrollToTop';
import { PageTransitionWrapper } from './components/common/PageTransitionWrapper';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ProgressProvider>
          <ManualQaProvider>
            <DevOpsProvider>
              <PageTransitionWrapper>
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

            {/* Course Curriculum & Syllabus Routes (Accessible to all students to inspect curriculum) */}
            <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />

            {/* Protected Routes: Learning Paths, Lessons, Quizzes & Simulator (Phase 4) */}
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

            {/* Manual QA in 5 Days Programme Routes */}
            <Route path="/manual-qa" element={<ManualQaCourseHubPage />} />
            <Route
              path="/manual-qa/day/:dayNumber"
              element={
                <ProtectedRoute>
                  <ManualQaDayLessonPage />
                </ProtectedRoute>
              }
            />
            <Route path="/courses/manual-testing" element={<ManualQaCourseHubPage />} />
            <Route
              path="/courses/manual-testing/day-1"
              element={
                <ProtectedRoute>
                  <ManualQaDayLessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/manual-testing/day/:dayNumber"
              element={
                <ProtectedRoute>
                  <ManualQaDayLessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manual-qa/surprise-test-1"
              element={
                <ProtectedRoute>
                  <SurpriseTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manual-qa/final-assessment"
              element={
                <ProtectedRoute>
                  <SurpriseTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manual-qa/final-project"
              element={
                <ProtectedRoute>
                  <FinalProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manual-qa/certificate"
              element={
                <ProtectedRoute>
                  <CourseCertificatePage />
                </ProtectedRoute>
              }
            />

            {/* Playwright Automation with JavaScript + AI (Course Lessons - Protected) */}
            <Route
              path="/courses/playwright-automation/day-1"
              element={
                <ProtectedRoute>
                  <PlaywrightDay1LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-2"
              element={
                <ProtectedRoute>
                  <PlaywrightDay2LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-3"
              element={
                <ProtectedRoute>
                  <PlaywrightDay3LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-4"
              element={
                <ProtectedRoute>
                  <PlaywrightDay4LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-5"
              element={
                <ProtectedRoute>
                  <PlaywrightDay5LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-6"
              element={
                <ProtectedRoute>
                  <PlaywrightDay6LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/surprise-test-1"
              element={
                <ProtectedRoute>
                  <PlaywrightSurpriseTest1Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-7"
              element={
                <ProtectedRoute>
                  <PlaywrightDay7LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/playwright-automation/day-8"
              element={
                <ProtectedRoute>
                  <PlaywrightDay8LessonPage />
                </ProtectedRoute>
              }
            />
            <Route path="/playwright" element={<Navigate to="/courses/playwright-automation" replace />} />
            <Route
              path="/playwright/day/1"
              element={
                <ProtectedRoute>
                  <PlaywrightDay1LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/2"
              element={
                <ProtectedRoute>
                  <PlaywrightDay2LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/3"
              element={
                <ProtectedRoute>
                  <PlaywrightDay3LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/4"
              element={
                <ProtectedRoute>
                  <PlaywrightDay4LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/5"
              element={
                <ProtectedRoute>
                  <PlaywrightDay5LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/6"
              element={
                <ProtectedRoute>
                  <PlaywrightDay6LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/surprise-test-1"
              element={
                <ProtectedRoute>
                  <PlaywrightSurpriseTest1Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/7"
              element={
                <ProtectedRoute>
                  <PlaywrightDay7LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playwright/day/8"
              element={
                <ProtectedRoute>
                  <PlaywrightDay8LessonPage />
                </ProtectedRoute>
              }
            />

            {/* DevOps Academy Routes */}
            <Route path="/courses/devops-engineering" element={<DevOpsCourseOverviewPage />} />
            <Route path="/devops" element={<Navigate to="/courses/devops-engineering" replace />} />
            <Route
              path="/courses/devops-engineering/day-1"
              element={
                <ProtectedRoute>
                  <DevOpsDay1LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/devops-engineering/day-2"
              element={
                <ProtectedRoute>
                  <DevOpsDay2LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/devops-engineering/day-3"
              element={
                <ProtectedRoute>
                  <DevOpsDay3LessonPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
              </PageTransitionWrapper>
          </DevOpsProvider>
          </ManualQaProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
