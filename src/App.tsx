import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicOnlyRoute } from './components/auth/PublicOnlyRoute';

import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProtectedPlaceholderPage } from './pages/ProtectedPlaceholderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
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

          {/* Protected Route for Phase 1 Authentication Verification */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <ProtectedPlaceholderPage />
              </ProtectedRoute>
            }
          />

          {/* Default entry point: redirect to /app (which will route to /login if unauthenticated) */}
          <Route path="/" element={<Navigate to="/app" replace />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
